"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./page.module.css";
import Sidebar from "./Components/sidebar";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function Home() {
  const [time, setTime] = useState(Date.now());
  const [allEvents, setAllEvents] = useState<string[]>([]);
  const [selevent, setSelevent] = useState("");

  useEffect(() => {
    setAllEvents(Object.keys(localStorage));
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className="position-fixed h-100 start-0 top-0">
        <Sidebar />
      </div>
      <Dropdown className={styles.dropdown}>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          Select Event
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {allEvents.length === 0 ? (
            <Dropdown.Item disabled>No Events</Dropdown.Item>
          ) : (
            allEvents.map((event, index) => (
              <Dropdown.Item key={index} onClick={() => setSelevent(event)}>
                {event}
              </Dropdown.Item>
            ))
          )}
        </Dropdown.Menu>
      </Dropdown>
      <main className={`${styles.main} ms-5`}>
        <div className={styles.rectangle}>
          <h2 className={styles.eventname}>{selevent}</h2>
          <h1 className={styles.h1}>{calcDate(selevent)}</h1>
        </div>
      </main>
    </div>
  );
}

function calcDate(event: string) {
  try {
    var Data = localStorage.getItem(event);
    var Date1 = JSON.parse(Data)[0];
    var Time = JSON.parse(Data)[1];
  } catch (err) {
    return "You haven't created any Events yet.";
  }
  var today = new Date();
  var date = new Date(Date1 + "T" + Time + ":00");
  var difference_days = 0;
  var difference_hours = 0;
  var difference_minutes = 0;
  var difference_seconds = 0;
  var difference = "";
  var all = 0;

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
