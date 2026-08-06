import { createClientSupabase } from "@/lib/supabase/client";
import { SignInWithEmail, SignUpWithEmail } from "@/types/auth";

export const useAuth = () => {
  const client = createClientSupabase();

  const signInWithProvider = async () => {
    const response = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "/auth/callback",
        queryParams: {
          access_type: "offline",
          propmp: "consent",
        },
      },
    });

    return response;
  };

  const signInWithEmail = async (params: SignInWithEmail) => {
    const response = await client.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    return response;
  };

  const signUpWithEmail = async (params: SignUpWithEmail) => {
    const response = await client.auth.signUp({
      email: params.email,
      password: params.password,
    });

    return response;
  };

  return {
    signInWithProvider,
    signInWithEmail,
    signUpWithEmail,
  };
};
