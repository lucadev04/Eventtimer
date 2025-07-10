"use client";

import Dropdown from "react-bootstrap/Dropdown";
import styles from "./page.module.css";
import CustomizePanel from "./Components/CustomizePanel";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Confetti from "react-confetti";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/css/uikit-core.min.css";
import "uikit/dist/js/uikit.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Home() {
  const [time, setTime] = useState(Date.now());
  const [allEvents, setAllEvents] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentParam = searchParams.get("event");

  useEffect(() => {
    setAllEvents(Object.keys(localStorage));
    //TODO: implemt selected event saving
    //setSelevent();
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function eventSetter(event: string) {
    router.push(`/?event=${event}`);
  }

  return (
    <div className={styles.page}>
      <Dropdown className={styles.dropdown}>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          Select Event
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {allEvents.length === 0 ? (
            <Dropdown.Item disabled>No Events</Dropdown.Item>
          ) : (
            allEvents.map((event, index) => (
              <Dropdown.Item key={index} onClick={() => eventSetter(event)}>
                {event}
              </Dropdown.Item>
            ))
          )}
        </Dropdown.Menu>
      </Dropdown>
      <main className={`${styles.main} ms-5`}>
        <div className={styles.rectangle}>
          <h2 className={styles.eventname}>{currentParam}</h2>
          <h1 className={styles.h1}>{calcDate(currentParam)}</h1>
        </div>
        <center>
          <button
            className="uk-button uk-button-primary"
            style={{ width: "10em" }}
            data-uk-toggle="target: #customize-panel; animation: uk-animation-slide-bottom-small"
          >
            Customize
          </button>
        </center>
      </main>
      <div
        id="customize-panel"
        hidden
        className="uk-position-bottom uk-overlay uk-overlay-default"
      >
        <div className="uk-animation-slide-bottom-small">
          <CustomizePanel />
        </div>
      </div>
    </div>
  );
}

function calcDate(event: string) {
  try {
    const Data = localStorage.getItem(event);
    var Date1 = JSON.parse(Data)[0];
    var Time = JSON.parse(Data)[1];
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
