"use client";

import { useState } from "react";
import styles from "../page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useRouter } from "next/navigation";

const event = function Event() {
  const [Eventname, setText] = useState("");
  const [Date1, setDate1] = useState("");
  const [Time, setTime] = useState("");
  const router = useRouter();
  const link = "/?event=" + Eventname;

  function handleEvent() {
    if (!Eventname || !Date1 || !Time) {
      alert("Please fill out all fields!");
      return;
    }
    let data = [];
    data = [Date1, Time];
    localStorage.setItem(Eventname, JSON.stringify(data));
    router.push(link);
  }
  return (
    <div className={styles.page}>
      <div className={styles.newevent}>
        <h1>New Event</h1>
        <form>
          <div className="mb-3">
            <label className="form-label">Eventname</label>
            <input
              type="text"
              className="form-control"
              id="eventName"
              onChange={(e) => setText(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="eventDate"
              onChange={(e) => setDate1(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              id="eventTime"
              onChange={(e) => setTime(e.target.value)}
              required
            ></input>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleEvent}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default event;
