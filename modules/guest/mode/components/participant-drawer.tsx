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
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { generateRandomID } from "@/lib/utils";
import { Edit, User, X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface ParticipantDrawerProps {
  participants: { id: string; name: string }[];
  setParticipant: (value: { id: string; name: string }[]) => void;
  isSubmitted: boolean;
}

export default function ParticipantDrawer({
  participants = [],
  setParticipant = () => {},
  isSubmitted = false,
}: ParticipantDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleMemberValueChange = (member: { id: string; name: string }) => {
    let newList = participants;

    newList = newList.map((mem) => {
      if (mem.id === member.id) {
        return { ...mem, name: member.name };
      } else {
        return mem;
      }
    });

    newList = newList.filter((mem) => mem?.name);

    if (newList?.filter((member) => !member.name).length === 0) {
      setParticipant(newList.concat({ id: generateRandomID(), name: "" }));
    } else {
      setParticipant(newList);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setParticipant(participants.filter((mem) => mem.id !== memberId));
  };

  const handleUpdateParticipant = (isOpen: boolean) => {
    const currentParticipants = participants;

    setParticipant(
      isOpen
        ? currentParticipants?.concat({ id: generateRandomID(), name: "" })
        : currentParticipants?.filter((mem) => mem?.name),
    );
  };

  return (
    <Drawer
      swipeDirection={isDesktop ? "right" : "down"}
      showSwipeHandle={!isDesktop}
      onOpenChange={handleUpdateParticipant}
    >
      <DrawerTrigger
        render={
          <button className="bg-secondary/5 border border-dashed border-secondary/30 p-3 rounded-lg flex items-center justify-center gap-2 opacity-70 cursor-pointer hover:bg-secondary/10 duration-200">
            <HugeiconsIcon icon={Edit} className="size-5" strokeWidth={2} />
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
          <DrawerTitle className="text-lg font-semibold">
            Participant for this trip
          </DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <div className="flex flex-col gap-2 relative">
          <div className="max-h-110 md:max-h-[calc(100vh-124px)] overflow-auto flex flex-col gap-3 py-10 px-4">
            {participants?.map((member, key) => (
              <Input
                key={key}
                type="text"
                placeholder={`Participant ${key + 1}`}
                value={member.name || ""}
                className="h-12 rounded-lg"
                onChange={(e) =>
                  handleMemberValueChange({
                    id: member.id,
                    name: e.target.value,
                  })
                }
                leftIcon={User}
                rightIcon={
                  participants.length > 1 && member?.name ? X : undefined
                }
                customRightIcon="size-4"
                onRightIconClick={() => handleRemoveMember(member.id)}
              />
            ))}
          </div>

          <div className="h-10 w-full absolute top-0 left-0 bg-linear-to-t from-transparent to-background to-70%" />
          <div className="h-10 w-full absolute bottom-0 left-0 bg-linear-to-b from-transparent to-background to-70%" />
        </div>
        <DrawerFooter>
          <DrawerClose render={<button className="btn-primary" />}>
            <p className="text-background font-semibold">Save</p>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
