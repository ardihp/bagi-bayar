"use client";

import { toast } from "@/components/ui/toast";
import { createClientSupabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useClientAuth = () => {
  const [loadingProvider, setLoadingProvider] = useState(false);
  const popupIntervalRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.origin !== window.location.origin) return;
      if (event.data === "login-success") {
        if (popupIntervalRef.current) clearInterval(popupIntervalRef.current);

        router.push("/app/dashboard");
        router.refresh();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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

        const popup = window.open(
          data.url,
          "SupabaseOAuthPopup", // Nama window
          `width=${width},height=${height},top=${top},left=${left}`,
        );

        popupIntervalRef.current = setInterval(() => {
          if (!popup || popup.closed) {
            clearInterval(popupIntervalRef.current);
            setLoadingProvider(false);

            toast.add({
              title: "Failed to authenticate",
              description: "Provider popup closed by user",
              type: "error",
            });
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
