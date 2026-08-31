"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  At,
  EyeIcon,
  EyeOff,
  Loading03Icon,
  LockKeyhole,
} from "@hugeicons/core-free-icons";
import { toast } from "@/components/ui/toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithEmail } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useClientAuth } from "@/hooks/use-client-auth";

const schema = yup.object().shape({
  email: yup.string().email().required("email is required"),
  password: yup.string().min(8).required("password is required"),
});

export default function SignUpView() {
  const [showPassword, setShowPassword] = useState(false);
  const { loadingProvider, handleAuthWithGoogle } = useClientAuth();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    const tempEmail = localStorage.getItem("temp_email_signup");

    if (tempEmail) {
      setValue("email", tempEmail);
      localStorage.removeItem("temp_email_signup");
    }
  }, []);

  const onSubmit = async (params: yup.InferType<typeof schema>) => {
    try {
      const response = await signUpWithEmail(params);

      if (!response.success) {
        throw new Error(response?.message);
      }

      router.push("/app/dashboard");
      router.refresh();
    } catch (error: any) {
      toast.add({
        title: "Failed to create account",
        description: error?.message as string,
        type: "error",
      });
      setValue("password", "");
    }
  };

  const onButtonSignUp = async () => {
    reset();
    await handleAuthWithGoogle();
  };

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold hidden md:inline">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Input email"
            aria-invalid={errors?.email ? "true" : "false"}
            className="h-12 rounded-lg"
            leftIcon={At}
            {...register("email")}
          />

          {errors?.email && (
            <small className="text-red-300 capitalize">
              {errors.email.message}
            </small>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold hidden md:inline">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Input password"
              aria-invalid={errors?.password ? "true" : "false"}
              className="h-12 rounded-lg px-13"
              leftIcon={LockKeyhole}
              rightIcon={showPassword ? EyeIcon : EyeOff}
              onRightIconClick={() => setShowPassword(!showPassword)}
              {...register("password")}
            />
          </div>

          {errors?.password && (
            <small className="text-red-300 capitalize">
              {errors.password.message}
            </small>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary flex items-center justify-center gap-2 w-full my-2 h-12"
        >
          <p className="text-background font-bold text-sm md:text-base">Create Account</p>
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            className="text-background size-5"
            strokeWidth={2.5}
          />
        </button>
      </form>

      <hr className="border-dashed border-secondary/30" />

      <button
        type="button"
        className="btn-primary from-white! to-white! flex items-center justify-center gap-2 sm:gap-3 w-full my-2 min-h-12"
        onClick={onButtonSignUp}
      >
        <img
          src="/images/google.webp"
          alt="Google Icon"
          className="size-5 shrink-0 object-cover"
        />
        <p className="text-sm md:text-base text-background font-bold text-center">
          Sign up with Google
        </p>
      </button>

      <div className="flex items-center justify-center gap-1 text-sm">
        <p>{`Already an explorer?`}</p>
        <Link href="/auth/sign-in" passHref>
          <p className="text-secondary font-bold">Sign In</p>
        </Link>
      </div>

      <div
        className={cn(
          "absolute top-0 left-0 -z-10 opacity-0 w-full h-full bg-transparent backdrop-blur-xs flex items-center justify-center duration-300",
          (loadingProvider || isSubmitting) &&
            "z-10 opacity-100 bg-background/80",
        )}
      >
        <HugeiconsIcon
          icon={Loading03Icon}
          className="text-secondary size-5 animate-spin"
          strokeWidth={3}
        />
      </div>
    </div>
  );
}
