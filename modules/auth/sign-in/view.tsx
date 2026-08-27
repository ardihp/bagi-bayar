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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkEmailProvider, signInWithEmail } from "@/hooks/use-auth";
import { useClientAuth } from "@/hooks/use-client-auth";
import { cn } from "@/lib/utils";

const schema = yup.object().shape({
  email: yup.string().email().required("email is required"),
  isEmailVerify: yup.boolean(),
  password: yup.string().when("isEmailVerify", {
    is: true,
    then: (schema) => schema.min(8).required("Password is required"),
    otherwise: (schema) => schema.optional(),
  }),
});

export default function SignInView() {
  const [showPassword, setShowPassword] = useState(false);
  const [loadingVerifyEmail, setLoadingVerifyEmail] = useState(false);
  const { loadingProvider, handleAuthWithGoogle } = useClientAuth();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    watch: getValue,
    setValue,
    setValues,
    formState: { errors, isSubmitting },
    trigger,
    reset,
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
    mode: "onChange",
  });

  const loadingSubmit = loadingProvider || isSubmitting;

  const onSubmit = async (params: yup.InferType<typeof schema>) => {
    if (!params.isEmailVerify) return handleContinuePassword();

    try {
      const { message, success } = await signInWithEmail({
        email: params.email,
        password: params.password!,
      });

      if (!success) {
        throw new Error(message);
      }

      router.push("/app/dashboard");
      router.refresh();
    } catch (error: any) {
      setValue("password", "");
      toast.add({
        title: "Failed to authenticate",
        description: error?.message as string,
        type: "error",
      });
    }
  };

  const handleContinuePassword = async () => {
    const isEmailValid = await trigger("email", { shouldFocus: true });
    if (!getValue("email")) return;

    setLoadingVerifyEmail(true);

    try {
      const { provider, message, success } = await checkEmailProvider({
        email: getValue("email"),
      });

      if (!success) {
        throw new Error(message);
      }

      if (isEmailValid && provider === "email") {
        setFocus("password", { shouldSelect: true });
        setValue("isEmailVerify", true, { shouldValidate: false });
      } else {
        throw new Error(
          "This email is registered using google account, please use sign in with google option",
        );
      }
    } catch (error: any) {
      setValues({ email: "", password: "" });
      setLoadingVerifyEmail(false);
      toast.add({
        title: "Failed to authenticate",
        description: error?.message as string,
        type: "error",
      });
    } finally {
      setLoadingVerifyEmail(false);
    }
  };

  const onButtonProvider = async () => {
    reset();
    await handleAuthWithGoogle();
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div
          className={cn(
            "flex flex-col gap-2",
            !getValue("isEmailVerify") && "-mb-4",
          )}
        >
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

        <div
          className={cn(
            "flex flex-col gap-2 opacity-0 h-0 duration-300",
            getValue("isEmailVerify") && "opacity-100 h-full",
          )}
        >
          <label htmlFor="password" className="font-semibold hidden md:inline">
            Password
          </label>
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

          {errors?.password && (
            <small className="text-red-300 capitalize">
              {errors.password.message}
            </small>
          )}
        </div>

        <button
          key={getValue("isEmailVerify") ? "btn-submit" : "btn-continue"}
          type={getValue("isEmailVerify") ? "submit" : "button"}
          className="btn-primary flex items-center justify-center gap-2 w-full my-2 h-12"
          onClick={
            getValue("isEmailVerify") ? () => {} : handleContinuePassword
          }
        >
          <p className="text-background font-bold">
            {getValue("isEmailVerify") ? "Sign In" : "Continue"}
          </p>
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            className="text-background size-5"
            strokeWidth={2.5}
          />
        </button>
      </form>

      <hr className="border-dashed border-secondary/30" />

      <button
        className="btn-primary from-white! to-white! flex items-center justify-center gap-2 sm:gap-3 w-full my-2 min-h-12"
        onClick={onButtonProvider}
      >
        <img
          src="/images/google.webp"
          alt="Google Icon"
          className="size-5 shrink-0 object-cover"
        />
        <p className="text-background font-bold text-center">
          Sign in with Google
        </p>
      </button>

      <div className="flex items-center justify-center gap-1 text-sm">
        <p>{`Are you the new explorer?`}</p>
        <Link href="/auth/sign-up" passHref>
          <p className="text-secondary font-bold">Sign Up</p>
        </Link>
      </div>

      <div
        className={cn(
          "absolute top-0 left-0 -z-10 opacity-0 w-full h-full bg-transparent backdrop-blur-xs flex items-center justify-center duration-300",
          (loadingSubmit || loadingVerifyEmail) &&
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
