import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import {
  Calendar03Icon,
  Contact,
  File01Icon,
  Plus,
  X,
} from "@hugeicons/core-free-icons";
import { Switch } from "@/components/ui/switch";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

const schema = yup.object().shape({
  name: yup.string().min(1, "Name trip is required"),
  isOneDayTrip: yup.boolean(),
  startDate: yup.date().required("Date trip is required"),
  endDate: yup.date().when("isOneDayTrip", {
    is: true,
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.required("Date end is required"),
  }),
  groupMember: yup
    .array()
    .min(1, "Atleast 1 group member is required to involve"),
  listExpenses: yup.array().min(1, "Atleast 1 expenses item is required"),
});

export default function CreateMode() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch: getValue,
    setValue,
    setValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { isOneDayTrip: false },
  });

  const handleDateChange = (newDate: DateRange | null) => {
    setValues({ startDate: newDate?.from, endDate: newDate?.to });
  };

  const onSubmit = (params: yup.InferType<typeof schema>) => {
    console.log(params);
  };

  return (
    <div className="md:p-8 rounded-2xl md:border md:border-secondary/30 md:bg-secondary/5 w-full flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <p className="text-lg md:text-xl font-semibold">Trip Information</p>

        <div className="flex flex-col gap-2">
          <Input
            id="nameTrip"
            type="text"
            placeholder={`Curug Cibulao Maret`}
            aria-invalid={errors?.name ? "true" : "false"}
            className="h-12 rounded-lg"
            leftIcon={File01Icon}
            {...register("name")}
          />

          {errors?.name && (
            <small className="text-red-300 capitalize">
              {errors.name.message}
            </small>
          )}
        </div>

        <label
          htmlFor="oneDayTrip"
          className="flex items-center justify-between p-4 rounded-lg border border-secondary/30 bg-secondary/5"
        >
          <div className="flex flex-col gap-1">
            <p className="text-sm md:text-base font-semibold">Same-day trip?</p>
            <p className="text-xs md:text-sm opacity-70">
              Depart and return on the same day
            </p>
          </div>

          <Switch
            id="oneDayTrip"
            {...register("isOneDayTrip")}
            onCheckedChange={(newValue) =>
              setValues({
                isOneDayTrip: newValue,
                startDate: undefined,
                endDate: undefined,
              })
            }
          />
        </label>

        <div className="relative flex flex-col gap-2">
          <Popover>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  id="date-picker-range"
                  aria-invalid={errors?.startDate ? "true" : "false"}
                  className="flex items-center justify-start font-normal rounded-lg! h-12 border border-secondary/30 bg-background w-full cursor-pointer aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                >
                  <div className="px-4">
                    <HugeiconsIcon
                      icon={Calendar03Icon}
                      className="inline-start size-5"
                      strokeWidth={2}
                    />
                  </div>
                  <p className="text-sm opacity-70">
                    {getValue("startDate") ? (
                      getValue("endDate") ? (
                        <>
                          {format(getValue("startDate") || "", "LLL dd, y")} -{" "}
                          {format(getValue("endDate") || "", "LLL dd, y")}
                        </>
                      ) : (
                        format(getValue("startDate") || "", "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </p>
                </button>
              }
            />
            <PopoverContent className="w-auto p-0" align="start">
              {getValue("isOneDayTrip") ? (
                <Calendar
                  mode="single"
                  defaultMonth={getValue("startDate")}
                  selected={getValue("startDate")}
                  onDayClick={(newDate) => setValue("startDate", newDate)}
                  required
                />
              ) : (
                <Calendar
                  mode="range"
                  defaultMonth={getValue("startDate")}
                  selected={{
                    from: getValue("startDate") || undefined,
                    to: getValue("endDate") || undefined,
                  }}
                  onSelect={handleDateChange}
                  required
                />
              )}
            </PopoverContent>
          </Popover>

          {errors?.startDate && (
            <small className="text-red-300 capitalize">
              {errors.startDate.message}
            </small>
          )}

          {getValue("startDate") && (
            <div
              className="absolute top-0 right-0 m-2 px-2 h-8 flex items-center rounded justify-center cursor-pointer bg-transparent hover:bg-secondary/5 duration-200"
              onClick={() =>
                setValues({ startDate: undefined, endDate: undefined })
              }
            >
              <HugeiconsIcon
                icon={X}
                className="inline-start size-4"
                strokeWidth={2}
              />
            </div>
          )}
        </div>

        <p className="text-lg md:text-xl font-semibold">Participants</p>

        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Alfred"
            className="h-12 rounded-lg"
            leftIcon={Contact}
          />

          <div className="bg-secondary/5 border border-dashed border-secondary/30 p-3 rounded-lg flex items-center justify-center gap-2 opacity-70">
            <HugeiconsIcon icon={Plus} className="size-5" strokeWidth={2} />
            <p className="font-semibold text-sm leading-none">
              Add more participant
            </p>
          </div>
        </div>
      </form>

      <div className="fixed md:relative bottom-12 md:bottom-0 left-0 w-full px-5 md:px-0">
        <button className="btn-primary w-full">
          <p className="text-background text-sm font-bold">Next</p>
        </button>
      </div>
    </div>
  );
}
