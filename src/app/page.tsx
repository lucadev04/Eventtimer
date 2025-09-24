"use client";

import styles from "./page.module.css";
import CustomizePanel from "./Components/customize-panel/customize-panel";
import Topbar from "./Components/topbar";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Confetti from "react-confetti";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEvents } from "./states/localStorage";

export default function Home() {
  const [time, setTime] = useState(Date.now());
  const [allEvents, setAllEvents] = useState<string | null>(null);
  const [background, setBackground] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const currentParam = searchParams.get("event");

  useEffect(() => {
    setAllEvents(localStorage.getItem("events"));
    changeBackground(currentParam);
    //TODO: implemt selected event saving
    //setSelevent();
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [currentParam, changeBackground]);

  function sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  async function toggleFullscreen() {
    const element = document.getElementById("Mainpage");
    const isFullscreen = document.fullscreenElement;
    if (!isFullscreen) {
      element?.requestFullscreen();
      await sleep(500);
      return toast(
        "Fullscreenmode has been enabled. To close press (Esc) or the Fullscreen Button",
      );
    } else {
      document.exitFullscreen();
    }
  }

  function getEventByName(name: string | null) {
    const events = useEvents.getState().events;
    return (
      events.find((e) => e.name.toLowerCase() === name.toLowerCase()) || null
    );
  }

  function changeBackground(event: string | null) {
    const Event = getEventByName(event);
    setBackground(Event?.background);
  }

  function calcDate(event: string | null) {
    try {
      const Data = getEventByName(event);
      var Date1 = Data.date;
      var Time = Data.time;
    } catch (err) {
      return "No events created";
    }
    const today = new Date();
    const date = new Date(Date1 + "T" + Time + ":00");
    let difference_days = 0;
    let difference_hours = 0;
    let difference_minutes = 0;
    let difference_seconds = 0;
    let difference = "";
    let all = 0;

    difference_days = differenceInDays(date, today);
    difference_hours = differenceInHours(date, today) - difference_days * 24;
    difference_minutes =
      differenceInMinutes(date, today) - differenceInHours(date, today) * 60;
    difference_seconds =
      differenceInSeconds(date, today) - differenceInMinutes(date, today) * 60;
    difference =
      difference_days.toString() +
      " day(s) " +
      difference_hours.toString() +
      ":" +
      difference_minutes.toString() +
      ":" +
      difference_seconds.toString();
    all =
      difference_days +
      difference_hours +
      difference_minutes +
      difference_seconds;
    if (all <= 0) {
      return <Confetti width={1920} height={1280} numberOfPieces={400} />;
    }
    return difference;
  }

  return (
    <div
      className={styles.page}
      id="Mainpage"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Toaster />
      <main className={`${styles.main} flex-1 p-6`}>
        <div className={styles.topbar}>
          <Topbar allEvents={allEvents} toggleFullscreen={toggleFullscreen} />
        </div>
        <div className={styles.rectangle}>
          <h2 className={styles.eventname}>{currentParam}</h2>
          <h1 className={styles.h1}>{calcDate(currentParam)}</h1>
          <CustomizePanel />
        </div>
      </main>
    </div>
  );
}
