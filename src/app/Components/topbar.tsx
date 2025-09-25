"use client";
import { Button } from "@/components/ui/button";
import { Plus, Fullscreen } from "lucide-react";
import { useRouter } from "next/navigation";
import EventSelector from "./event-selector";

type TopbarProps = {
  toggleFullscreen: () => void;
};

const Topbar = ({ toggleFullscreen }: TopbarProps) => {
  const router = useRouter();

  function changeRoute() {
    router.push("/new-event");
  }

  return (
    <div className="flex justify-end gap-2 mb-6">
      <Button size="icon" onClick={toggleFullscreen}>
        <Fullscreen />
      </Button>
      <Button size="icon" onClick={changeRoute}>
        <Plus />
      </Button>
      <EventSelector />
      <Button>Login</Button>
    </div>
  );
};

export default Topbar;
