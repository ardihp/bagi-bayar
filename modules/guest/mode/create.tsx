import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import {
  Calendar03Icon,
  Contact,
  Edit,
  File01Icon,
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
import { generateRandomID } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
    .of(
      yup.object({
        id: yup.string().required(),
        name: yup.string().required("Name is required"),
      }),
    )
    .min(1, "Atleast 1 group member is required to involve")
    .required(),
  listExpenses: yup.array().min(1, "Atleast 1 expenses item is required"),
});

export default function CreateMode() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch: getValue,
    setValue,
    setValues,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      isOneDayTrip: false,
      groupMember: [{ id: generateRandomID(), name: "" }],
    },
  });

  console.log(errors);

  const onSubmit = (params: yup.InferType<typeof schema>) => {
    console.log(params);
  };

  const handleDateChange = (
    input:
      | { type: "single"; newDate: Date }
      | { type: "range"; newDate: DateRange },
  ) => {
    if (input.type === "range") {
      setValues({
        startDate: input.newDate?.from,
        endDate: input.newDate?.to,
      });
    } else {
      setValue("startDate", input.newDate);
    }

    trigger("startDate");
    trigger("endDate");
  };

  const handleMemberValueChange = (member: { id: string; name: string }) => {
    let newMembers = getValue("groupMember");

    newMembers = newMembers.map((mem) => {
      if (mem.id === member.id) {
        return { ...mem, name: member.name };
      } else {
        return mem;
      }
    });

    setValue("groupMember", newMembers);
    trigger("groupMember");
  };

  const handleAddMember = () => {
    setValue("groupMember", [
      ...getValue("groupMember"),
      { id: generateRandomID(), name: "" },
    ]);
    trigger("groupMember");
  };

  const handleRemoveMember = (memberId: string) => {
    setValue(
      "groupMember",
      getValue("groupMember").filter((mem) => mem.id !== memberId),
    );
    trigger("groupMember");
  };

  return (
    <div className="md:p-8 rounded-2xl md:border md:border-secondary/30 md:bg-secondary/5 w-full flex flex-col gap-6 mb-10">
      <form
        id="create"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
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
            onCheckedChange={(newValue) => {
              setValues({
                isOneDayTrip: newValue,
                startDate: undefined,
                endDate: undefined,
              });
              trigger("startDate");
            }}
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
                  className="flex items-center justify-start font-normal rounded-lg! h-12 border border-secondary/30 bg-background w-full cursor-pointer aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:focus-within:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 aria-invalid:transition-all"
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
                  onDayClick={(newDate) =>
                    handleDateChange({ type: "single", newDate })
                  }
                  required
                />
              ) : (
                <Calendar
                  mode="range"
                  defaultMonth={getValue("startDate")}
                  selected={{
                    from: getValue("startDate"),
                    to: getValue("endDate"),
                  }}
                  onSelect={(newDate) =>
                    handleDateChange({ type: "range", newDate })
                  }
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
          <div className="flex flex-col gap-2">
            {getValue("groupMember")?.map((member, key) => (
              <Input
                key={key}
                type="text"
                placeholder="Budi"
                value={member.name || ""}
                className="h-12 rounded-lg"
                aria-invalid={!member.name && isSubmitted ? "true" : "false"}
                onChange={(e) =>
                  handleMemberValueChange({
                    id: member.id,
                    name: e.target.value,
                  })
                }
                leftIcon={Contact}
                rightIcon={getValue("groupMember").length > 1 ? X : undefined}
                customRightIcon="size-4"
                onRightIconClick={() => handleRemoveMember(member.id)}
              />
            ))}

            {errors?.groupMember && (
              <small className="text-red-300 capitalize">
                {
                  (Array.isArray(errors?.groupMember)
                    ? errors.groupMember.filter((item) => item)
                    : errors?.groupMember)[0]?.name?.message
                }
              </small>
            )}
          </div>

          <Drawer>
            <DrawerTrigger
              render={
                <button
                  className="bg-secondary/5 border border-dashed border-secondary/30 p-3 rounded-lg flex items-center justify-center gap-2 opacity-70 cursor-pointer hover:bg-secondary/10 duration-200"
                >
                  <HugeiconsIcon
                    icon={Edit}
                    className="size-5"
                    strokeWidth={2}
                  />
                  <p className="font-semibold text-sm leading-none">
                    Edit participant
                  </p>
                </button>
              }
            >
              Open
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">{/* Content here */}</div>
              <DrawerFooter>
                <button>Submit</button>
                <DrawerClose render={<button />}>Cancel</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </form>

      <div className="fixed md:relative bottom-0 pb-12 pt-4 md:pb-0 md:pt-0 left-0 w-full px-5 md:px-0 bg-transparent backdrop-blur-md">
        <button form="create" className="btn-primary w-full">
          <p className="text-background text-sm font-bold">Next</p>
        </button>
      </div>
    </div>
  );
}
