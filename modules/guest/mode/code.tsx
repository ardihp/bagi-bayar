import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ArrowRight02Icon,
  ArrowTurnBackwardIcon,
  InputCursorTextIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  code: yup.string().min(1, "Code is required"),
});

export default function CodeMode() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const onSubmit = (params: yup.InferType<typeof schema>) => {
    console.log(params);
  };

  return (
    <div className="md:p-8 rounded-2xl md:border md:border-secondary/30 md:bg-secondary/5 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 md:gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="code" className="font-semibold hidden md:inline">
            Code
          </label>
          <Input
            id="code"
            type="text"
            placeholder="Input code"
            aria-invalid={errors?.code ? "true" : "false"}
            className="h-12 rounded-lg"
            leftIcon={InputCursorTextIcon}
            {...register("code")}
          />

          {errors?.code && (
            <small className="text-red-300 capitalize">
              {errors.code.message}
            </small>
          )}
        </div>

        <button className="btn-primary flex items-center justify-center gap-2 w-full mt-2 h-12">
          <p className="text-background font-bold text-sm md:text-base">
            Continue
          </p>
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            className="text-background size-5"
            strokeWidth={2.5}
          />
        </button>
      </form>
    </div>
  );
}
