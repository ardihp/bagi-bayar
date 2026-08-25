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
    return closePopupAndNotify("login-success");
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
          } catch (e) {
            console.error(e);
          }

          // Force close popup
          setTimeout(() => {
            window.open("", "_self", "");
            window.close();
          }, 200);
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
