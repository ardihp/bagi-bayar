"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { SignInWithEmail, SignUpWithEmail } from "@/types/auth";
import { revalidatePath } from "next/cache";

export const signInWithProvider = async () => {
  const client = await createServerSupabase();

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

export const signInWithEmail = async (params: SignInWithEmail) => {
  const client = await createServerSupabase();
  const { data, error } = await client.auth.signInWithPassword({
    email: params.email,
    password: params.password,
  });

  if (error) {
    return {
      success: false,
      message: error?.message,
    };
  }

  return {
    success: true,
    user: data.user,
    message: "Success login",
  };
};

export const signUpWithEmail = async (params: SignUpWithEmail) => {
  const client = await createServerSupabase();

  const { data, error } = await client.auth.signUp({
    email: params.email,
    password: params.password,
  });

  if (error) {
    return {
      success: false,
      message: error?.message,
    };
  }

  return {
    success: true,
    user: data.user,
    message: "Success login",
  };
};

export const signOutUser = async () => {
  const client = await createServerSupabase();
  await client.auth.signOut();
};
