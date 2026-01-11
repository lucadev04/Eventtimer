"use client";

import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useEvents } from "../states/localStorage";

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  background?: string;
}

interface Props {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  event: Event;
}

export default function EventEditSheet({
  open,
  onOpenChangeAction,
  event,
}: Props) {
  const { updateEvent } = useEvents();

  const [name, setName] = useState(event.name || "");
  const [date, setDate] = useState(event.date || "");
  const [time, setTime] = useState(event.time || "");

  useEffect(() => {
    setName(event.name);
    setDate(event.date);
    setTime(event.time);
  }, [event]);

  const handleSave = () => {
    updateEvent(event.id, {
      name,
      date,
      time,
    });

    onOpenChangeAction(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChangeAction}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Event</SheetTitle>
          <SheetDescription>
            Edit the event <strong>{event.name}</strong>
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Button onClick={handleSave} disabled={!name || !date || !time}>
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
