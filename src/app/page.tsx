"use client";

import styles from "./page.module.css";
import Topbar from "./Components/topbar";

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Confetti from "react-confetti";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEvents } from "./states/localStorage";
import { Button } from "@/components/ui/button";
import { Edit2, Image, Palette, Trash2 } from "lucide-react";
import EventEditSheet from "@/app/Components/event-edit-sheet";
import BackgroundChangeSheet from "./Components/background-change-sheet";

export type Event = {
  id: string;
  name: string;
  date: string;
  time: string;
  background?: string;
};

export default function Home() {
  const searchParams = useSearchParams();
  const currentParam = searchParams.get("event");

  const events = useEvents((state) => state.events);

  const [now, setNow] = useState(Date.now());

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [backgroundOpen, setBackgroundOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const event: Event | undefined = useMemo(() => {
    if (!currentParam) return undefined;

    return events.find(
      (e) => e.name.toLowerCase() === currentParam.toLowerCase(),
    );
  }, [events, currentParam]);

  const background = event?.background;

  async function toggleFullscreen() {
    const element = document.getElementById("Mainpage");

    if (!document.fullscreenElement) {
      await element?.requestFullscreen();
      toast(
        "Fullscreen mode enabled. Press Esc or the fullscreen button to exit.",
      );
    } else {
      await document.exitFullscreen();
    }
  }

  function renderCountdown() {
    if (events.length === 0) {
      return "No events created";
    }

    if (!event) return "Event not found";

    const target = new Date(`${event.date}T${event.time}:00`);
    const current = new Date(now);

    const days = differenceInDays(target, current);
    const hours = differenceInHours(target, current) - days * 24;
    const minutes =
      differenceInMinutes(target, current) -
      differenceInHours(target, current) * 60;
    const seconds =
      differenceInSeconds(target, current) -
      differenceInMinutes(target, current) * 60;

    const total = days + hours + minutes + seconds;

    if (total <= 0) {
      return <Confetti width={1920} height={1280} numberOfPieces={400} />;
    }

    return `${days} day(s) ${hours}:${minutes}:${seconds}`;
  }

  return (
    <div
      id="Mainpage"
      className={styles.page}
      style={{
        backgroundImage: background ? `url(${background})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Toaster />

      <main className={`${styles.main} flex-1 p-6`}>
        <div className={styles.topbar}>
          <Topbar toggleFullscreen={toggleFullscreen} />
        </div>

        <div className={styles.rectangle}>
          <h2 className={styles.eventname}>
            {currentParam ?? "No event selected"}
          </h2>

          <h1 className={styles.h1}>{renderCountdown()}</h1>
          <Button onClick={() => setBackgroundOpen(true)}>
            <Image />
          </Button>
          <Button className="ml-2" onClick={() => setEditOpen(true)}>
            <Edit2 />
          </Button>
          <Button className="ml-2">
            <Trash2 />
          </Button>

          <EventEditSheet
            open={editOpen}
            onOpenChangeAction={setEditOpen}
            event={
              event ?? {
                id: "",
                name: "",
                date: "",
                time: "",
                background: undefined,
              }
            }
          />
          <BackgroundChangeSheet
            open={backgroundOpen}
            onOpenChangeAction={setBackgroundOpen}
            event={
              event ?? {
                id: "",
                name: "",
                date: "",
                time: "",
                background: undefined,
              }
            }
          />
        </div>
      </main>
    </div>
  );
}
