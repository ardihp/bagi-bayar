"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { SignInWithEmail, SignUpWithEmail } from "@/types/auth";

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

export const checkEmailProvider = async (params: { email: string }) => {
  const client = await createServerSupabase();
  const { data, error } = await client.rpc("cek_provider_email", {
    email_input: params.email,
  });

  if (error) {
    return {
      success: false,
      message: error?.message,
    };
  }

  if (data === "user_unregistered") {
    return {
      success: false,
      message: "User not registered",
    };
  }

  return {
    success: true,
    provider: data,
    message: "Success retrive user data",
  };
};
