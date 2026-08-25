"use client";

import { toast } from "@/components/ui/toast";
import { createClientSupabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useClientAuth = () => {
  const [loadingProvider, setLoadingProvider] = useState(false);
  const popupIntervalRef = useRef<any>(null);
  const router = useRouter();

  const handleAuthWithGoogle = async () => {
    if (loadingProvider) return;

    try {
      setLoadingProvider(true);

      const client = createClientSupabase();
      const { data, error } = await client.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          skipBrowserRedirect: true,
        },
      });

      if (error) {
        console.error(error);
        setLoadingProvider(false);
        return;
      }

      if (data?.url) {
        const width = 500;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        let channelHandled = false;
        const channel = new BroadcastChannel("auth_channel");
        const popup = window.open(
          data.url,
          "SupabaseOAuthPopup", // Nama window
          `width=${width},height=${height},top=${top},left=${left}`,
        );

        const cleanup = () => {
          popupIntervalRef.current = clearInterval(popupIntervalRef.current);
          channel.close();
          setLoadingProvider(false);
        };

        channel.onmessage = (event) => {
          channelHandled = true;

          console.log(event);

          if (event.data?.type === "login-success") {
            cleanup();
            // Redirect tab utama ke halaman after login
            router.push("/app/dashboard");
            router.refresh();
          } else if (event.data?.type === "login-failed") {
            toast.add({
              id: "channel",
              title: "Failed to authenticate",
              description: "Provider login failed",
              type: "error",
            });
          }
        };

        // Untuk handle user yang close popup secara sengaja
        popupIntervalRef.current = setInterval(() => {
          if (!popup || popup.closed) {
            clearInterval(popupIntervalRef.current);
            setLoadingProvider(false);

            setTimeout(() => {
              if (!channelHandled) {
                toast.add({
                  id: "popup",
                  title: "Failed to authenticate",
                  description: "Provider popup closed by user",
                  type: "error",
                });
              }
            }, 400);
          }
        }, 500);
      }
    } catch (error) {
      console.error(error);
      setLoadingProvider(false);
    }
  };

  return { loadingProvider, handleAuthWithGoogle };
};
