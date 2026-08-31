import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Calendar03Icon, File01Icon, X } from "@hugeicons/core-free-icons";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
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
  startDate: yup.date(),
  endDate: yup.date(),
  isGroup: yup.boolean(),
  groupMember: yup.array().when("isGroup", {
    is: true,
    then: (schema) =>
      schema.min(1, "Atleast 1 group member is required to involve"),
    otherwise: (schema) => schema.optional(),
  }),
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
    defaultValues: {
      isGroup: false,
      isOneDayTrip: false,
    },
  });

  const handleDateChange = (newDate: DateRange | null) => {
    setValues({ startDate: newDate?.from, endDate: newDate?.to });
  };

  return (
    <div className="md:p-8 rounded-2xl md:border md:border-secondary/30 md:bg-secondary/5 w-full">
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="nameTrip" className="font-semibold hidden md:inline">
            Trip name
          </label>
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

        <div className="flex flex-col gap-2">
          <label className="font-semibold hidden md:inline">Date Time</label>

          <div className="relative">
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    id="date-picker-range"
                    className="flex items-center justify-start font-normal rounded-lg! h-12 border border-secondary/30 bg-background w-full cursor-pointer"
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
        </div>
      </form>
    </div>
  );
}
