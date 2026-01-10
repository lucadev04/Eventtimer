"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styles from "../page.module.css";
import { useEvents } from "../states/localStorage";

export default function Event() {
  const [eventName, setEventName] = useState("");
  const [date1, setDate1] = useState("");
  const [time, setTime] = useState("");
  const router = useRouter();

  const addEvent = useEvents((s) => s.addEvent);
  const events = useEvents((s) => s.events);

  function handleEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!eventName || !date1 || !time) {
      alert("Please fill out all fields!");
      return;
    }

    const exists = events.some(
      (e) => e.name.toLowerCase() === eventName.toLowerCase(),
    );

    if (exists) {
      alert("This event already exists!");
      return;
    }

    addEvent({
      name: eventName,
      date: date1,
      time: time,
    });

    router.push(`/?event=${eventName}`);
  }

  return (
    <div className={styles.page}>
      <div className={styles.newevent}>
        <h1 className="text-2xl font-bold mb-6">New Event</h1>
        <form onSubmit={handleEvent} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventName">Eventname</Label>
            <Input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventDate">Date</Label>
            <Input
              type="date"
              id="eventDate"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventTime">Time</Label>
            <Input
              type="time"
              id="eventTime"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}
