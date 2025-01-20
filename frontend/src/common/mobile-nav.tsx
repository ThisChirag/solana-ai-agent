import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const MobileNavbarDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="mr-2 h-6 w-6" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className=" h-full flex flex-col items-center justify-center gap-4"
      >
        <SheetClose asChild>
          <a href="/chat">Chat</a>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbarDrawer;
