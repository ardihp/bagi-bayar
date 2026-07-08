import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function FloatingButton() {
  return (
    <div className="fixed bottom-4 right-4 p-4 border rounded-full">
      <HugeiconsIcon icon={Plus} />
    </div>
  );
}
