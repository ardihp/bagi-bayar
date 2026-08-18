"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { SignInWithEmail, SignUpWithEmail } from "@/types/auth";

export const signInWithProvider = async () => {
  const client = await createServerSupabase();

  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "/auth/callback",
    },
  });

  console.log(data, error);

  if (error) {
    return {
      success: false,
      message: error?.message,
    };
  }

  return {
    success: true,
    data: data,
    message: "Success login",
  };
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
