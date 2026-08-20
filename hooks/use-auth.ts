"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { SignInWithEmail, SignUpWithEmail, VerifyOTP } from "@/types/auth";

export const signInWithEmail = async (params: SignInWithEmail) => {
  const client = await createServerSupabase();
  const { data, error } = await client.auth.signInWithOtp({
    email: params.email,
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

export const signInWithOTP = async (params: { email: string }) => {
  const client = await createServerSupabase();
  const { data, error } = await client.auth.signInWithOtp({
    email: params.email,
    options: {
      shouldCreateUser: false,
    },
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
    message: "OTP Code sent, please kindly check your email.",
  };
};

export const verifyOTP = async (params: VerifyOTP) => {
  const client = await createServerSupabase();
  const { data, error } = await client.auth.verifyOtp({
    email: params.email,
    token: params.otp,
    type: "email",
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
    message: "OTP Valid, redirecting you to dashboard.",
  };
};
