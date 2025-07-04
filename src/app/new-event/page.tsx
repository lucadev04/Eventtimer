"use client";

import { useState } from "react";
import styles from "../page.module.css";
import Sidebar from "../Components/sidebar";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Toast from "react-bootstrap/Toast";
import Link from "next/link";

const event = function Event() {
  const [Eventname, setText] = useState("");
  const [Date1, setDate1] = useState("");
  const [Time, setTime] = useState("");
  var today = new Date();
  var date = new Date(Date1 + "T" + Time + ":00");
  var difference = "";
  var data = [];

  function handleEvent() {
    difference =
      differenceInDays(date, today) +
      " Tage " +
      differenceInHours(date, today) +
      ":" +
      differenceInMinutes(date, today) +
      ":" +
      differenceInSeconds(date, today);
    data = [Date1, Time];
    localStorage.setItem(Eventname, JSON.stringify(data));
    return (
      <Toast>
        <Toast.Header>
          <strong className="me-auto">Event</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>You have created the event ** {Eventname} **</Toast.Body>
      </Toast>
    );
  }
  return (
    <div className={styles.page}>
      <div className="position-fixed h-100 start-0 top-0">
        <Sidebar />
      </div>
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
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="eventDate"
              onChange={(e) => setDate1(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              id="eventTime"
              onChange={(e) => setTime(e.target.value)}
            ></input>
          </div>
          <Link href={"/"}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleEvent}
            >
              Add
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default event;
