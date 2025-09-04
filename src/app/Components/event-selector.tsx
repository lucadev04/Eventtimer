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
  allEvents: string[];
};

const EventSelector = ({ allEvents }: EventSelectorProps) => {
  const router = useRouter();
  function eventSetter(event: string) {
    router.push(`/?event=${event}`);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Select Event</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {allEvents.length === 0 ? (
          <DropdownMenuItem disabled>No Events</DropdownMenuItem>
        ) : (
          allEvents.map((event, index) => (
            <DropdownMenuItem key={index} onClick={() => eventSetter(event)}>
              {event}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EventSelector;
