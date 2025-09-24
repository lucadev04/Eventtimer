"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type EventSelectorProps = {
  allEvents: string;
};

const EventSelector = ({ allEvents }: EventSelectorProps) => {
  const router = useRouter();
  const events = JSON.parse(allEvents);
  function eventSetter(event: string) {
    router.push(`/?event=${event}`);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Select Event</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {allEvents === null ? (
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
