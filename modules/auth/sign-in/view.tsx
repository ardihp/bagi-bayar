"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight, Loading03Icon } from "@hugeicons/core-free-icons";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/components/ui/toast";

const schema = yup.object().shape({
  email: yup.string().email().required("email is required"),
  password: yup.string().required("password is required"),
});

export default function SignInView() {
  const { signInWithEmail } = useAuth();

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
      const { data, error } = await signInWithEmail(params);

      if (error) {
        throw new Error(error?.message);
      }

      console.log(data);
    } catch (error: any) {
      toast.add({
        title: "Failed to authenticate",
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
        <Input
          id="password"
          type="password"
          placeholder="Input password"
          aria-invalid={errors?.password ? "true" : "false"}
          className="h-12 rounded-lg"
          {...register("password")}
        />

        {errors?.password && (
          <small className="text-red-300 capitalize">
            {errors.password.message}
          </small>
        )}
      </div>

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
              icon={ArrowRight}
              className="text-background size-5"
              strokeWidth={3}
            />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1 text-sm">
        <p>{`Are you the new explorer?`}</p>
        <Link href="/auth/sign-up" passHref>
          <p className="text-secondary font-bold">Sign Up</p>
        </Link>
      </div>
    </form>
  );
}
