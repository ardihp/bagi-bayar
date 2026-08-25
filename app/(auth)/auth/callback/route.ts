import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/app/dashboard";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/app/dashboard";
  }

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) return closePopupAndNotify("login-failed");

    const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
    const isLocalEnv = process.env.NODE_ENV === "development";
    if (isLocalEnv) {
      // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
      return closePopupAndNotify("login-success");
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${next}`);
    } else {
      return closePopupAndNotify("login-success");
    }
  } else {
    return closePopupAndNotify("login-failed");
  }

  function closePopupAndNotify(status: "login-success" | "login-failed") {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Authenticating...</title>
      </head>
      <body>
        <p>Autentikasi selesai. Menutup jendela...</p>
        <script>
          try {
            const channel = new BroadcastChannel("auth_channel");
            channel.postMessage({ type: "${status}" });
            channel.close();
          } catch (e) {
            console.error(e);
          }

          // Force close popup
          window.open('', '_self', '');
          window.close();
        </script>
      </body>
    </html>
  `;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  }
}
