"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight,
  EyeIcon,
  EyeOff,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/components/ui/toast";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup.string().email().required("email is required"),
  password: yup.string().min(8).required("password is required"),
});

export default function SignUpView() {
  const [showPassword, setShowPassword] = useState(false);
  const { signUpWithEmail } = useAuth();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const onSubmit = async (params: yup.InferType<typeof schema>) => {
    try {
      const { data, error } = await signUpWithEmail(params);

      if (error) {
        throw new Error(error?.message);
      }

      console.log(data);
    } catch (error: any) {
      toast.add({
        title: "Failed to sign up",
        description: error?.message as string,
      });
      setValue("password", "");
    }
  };

  return (
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
          {...register("email")}
        />

        {errors?.email && (
          <small className="text-red-300 capitalize">
            {errors.email.message}
          </small>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Input password"
            aria-invalid={errors?.password ? "true" : "false"}
            className="h-12 rounded-lg"
            {...register("password")}
          />

          <div className="absolute flex items-center justify-center top-0 right-0 h-12 px-4 cursor-pointer">
            <HugeiconsIcon
              icon={showPassword ? EyeIcon : EyeOff}
              className="size-5"
              strokeWidth={2}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
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
        {isSubmitting ? (
          <HugeiconsIcon
            icon={Loading03Icon}
            className="text-background size-5 animate-spin"
            strokeWidth={3}
          />
        ) : (
          <>
            <p className="text-background font-bold">Sign Up</p>
            <HugeiconsIcon
              icon={ArrowRight}
              className="text-background size-5"
              strokeWidth={3}
            />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1 text-sm">
        <p>{`Already an explorer?`}</p>
        <Link href="/auth/sign-in" passHref>
          <p className="text-secondary font-bold">Sign In</p>
        </Link>
      </div>
    </form>
  );
}
