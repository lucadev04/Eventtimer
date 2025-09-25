"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEvents } from "../states/localStorage";

const EventSelector = () => {
  const router = useRouter();
  const events = useEvents((s) => s.events);

  function eventSetter(event: string) {
    router.push(`/?event=${event}`);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Select Event</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {events === null ? (
          <DropdownMenuItem disabled>No Events</DropdownMenuItem>
        ) : (
          events.map((event, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => eventSetter(event.name)}
            >
              {event.name}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EventSelector;
