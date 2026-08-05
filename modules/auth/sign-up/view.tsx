"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight } from "@hugeicons/core-free-icons";

const schema = yup.object().shape({
  email: yup.string().email().required("email is required"),
  password: yup.string().required("password is required"),
});

export default function SignUpView() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  console.log(errors);

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    console.log(data);
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
      >
        <p className="text-background font-bold">Sign Up</p>
        <HugeiconsIcon
          icon={ArrowRight}
          className="text-background size-5"
          strokeWidth={3}
        />
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
