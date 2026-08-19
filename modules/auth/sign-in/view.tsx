"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  ArrowTurnBackwardIcon,
  At,
  EyeIcon,
  EyeOff,
  Loading03Icon,
  LockKeyhole,
} from "@hugeicons/core-free-icons";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmail, signInWithOTP } from "@/hooks/use-auth";

export default function SignInView() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const schema = yup.object().shape({
    email: yup.string().email().required("email is required"),
    isLoginWithPassword: yup.boolean(),
    password: yup.string().when("isLoginWithPassword", {
      is: true,
      then: (schema) => schema.required("Password is required"),
      otherwise: (schema) => schema.optional(),
    }),
  });

  const {
    handleSubmit,
    register,
    setValue,
    watch: getValue,
    formState: { errors, isSubmitting, isValid },
    clearErrors,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
    mode: "onChange",
  });

  const onSubmit = async (params: yup.InferType<typeof schema>) => {
    try {
      let formData = {
        ...params,
        password: params.password!,
      };

      const response = await signInWithEmail(formData);

      if (!response.success) {
        throw new Error(response?.message);
      }

      router.push("/app/dashboard");
      router.refresh();
    } catch (error: any) {
      toast.add({
        title: "Failed to authenticate",
        description: error?.message as string,
      });
      setValue("password", "");
    }
  };

  const handleSendOTP = async () => {
    try {
      const response = await signInWithOTP({ email: getValue("email") });

      if (!response.success) {
        throw new Error(response?.message);
      }
    } catch (error: any) {
      toast.add({
        title: "Failed to sent OTP",
        description: error?.message as string,
      });
    }
  };

  console.log(errors);

  const handleContinuePassword = () => {
    trigger("email", { shouldFocus: true });
    if (isValid) {
      setValue("isLoginWithPassword", true);
    }
  };

  const handleBackValidation = () => {
    setValue("isLoginWithPassword", false);
    setValue("password", "");
    trigger("email", { shouldFocus: true });
    clearErrors();
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold">
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

        {getValue("isLoginWithPassword") ? (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold">
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

            <div className="flex gap-4">
              <button
                type="button"
                className="btn-primary flex items-center justify-center gap-2 w-full max-w-12 my-2 h-12 p-0!"
                onClick={handleBackValidation}
              >
                <HugeiconsIcon
                  icon={ArrowTurnBackwardIcon}
                  className="text-background size-5"
                  strokeWidth={2.5}
                />
              </button>

              <button
                type="submit"
                className="btn-primary flex items-center justify-center gap-2 w-full my-2 h-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <HugeiconsIcon
                    icon={Loading03Icon}
                    className="text-background size-5 animate-spin"
                    strokeWidth={3}
                  />
                ) : (
                  <>
                    <p className="text-background font-bold">Sign In</p>
                    <HugeiconsIcon
                      icon={ArrowRight02Icon}
                      className="text-background size-5"
                      strokeWidth={2.5}
                    />
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="flex gap-4">
            <button
              type="button"
              className="btn-primary flex items-center justify-center gap-2 w-full my-2 h-12"
              onClick={handleContinuePassword}
            >
              <p className="text-background font-bold">
                Continue with Password
              </p>
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                className="text-background size-5"
                strokeWidth={2.5}
              />
            </button>

            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 w-full my-2 h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <HugeiconsIcon
                  icon={Loading03Icon}
                  className="text-background size-5 animate-spin"
                  strokeWidth={3}
                />
              ) : (
                <>
                  <p className="text-background font-bold">Continue with OTP</p>
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    className="text-background size-5"
                    strokeWidth={2.5}
                  />
                </>
              )}
            </button>
          </div>
        )}
      </form>

      <hr className="border-dashed border-secondary/30" />

      <button className="btn-primary from-white! to-white! flex items-center justify-center gap-3 w-full my-2 h-12">
        <img
          src="/images/google.webp"
          alt="Google Icon"
          className="size-5 object-cover"
        />
        <p className="text-background font-bold">Sign in with Google</p>
      </button>

      <div className="flex items-center justify-center gap-1 text-sm">
        <p>{`Are you the new explorer?`}</p>
        <Link href="/auth/sign-up" passHref>
          <p className="text-secondary font-bold">Sign Up</p>
        </Link>
      </div>
    </div>
  );
}
