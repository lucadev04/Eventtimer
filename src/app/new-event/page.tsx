"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styles from "../page.module.css";

export default function Event() {
  const [eventName, setEventName] = useState("");
  const [date1, setDate1] = useState("");
  const [time, setTime] = useState("");
  const router = useRouter();
  const link = "/?event=" + eventName;

  function handleEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!eventName || !date1 || !time) {
      alert("Please fill out all fields!");
      return;
    }
    const raw_events = localStorage.getItem("events");
    const data = { name: eventName, date: date1, time: time };
    if (!raw_events) {
      localStorage.setItem("events", JSON.stringify([data]));
      router.push(link);
    } else {
      const event_check = raw_events.includes(eventName);
      if (!event_check) {
        const events = raw_events ? JSON.parse(raw_events) : [];
        events.push(data);
        localStorage.setItem("events", JSON.stringify(events));
        router.push(link);
      } else {
        alert("This event exists already!");
        return;
      }
    }
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
