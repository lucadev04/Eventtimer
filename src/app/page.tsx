'use client'

import styles from "./page.module.css";
import event from "./new_event";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { useEffect, useState } from "react";
import Confetti from 'react-confetti'


export default function Home() {
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className={styles.page}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" integrity="sha256-2TnSHycBDAm2wpZmgdi0z81kykGPJAkiUY+Wf97RbvY=" crossOrigin="anonymous"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js" integrity="sha256-gOQJIa9+K/XdfAuBkg2ONAdw5EnQbokw/s2b8BqsRFg=" crossOrigin="anonymous"></script>
      <header className={styles.header}>
        <p>{event()}</p>
      </header>
      <main className={styles.main}>
        <div className={styles.rectangle}>
            <h1 className={styles.h1}>{calcDate()}</h1>
        </div>
      </main>
    </div>
    );



}

function calcDate(){
  var Date1 = localStorage.getItem("eventDate");
  var Time = localStorage.getItem("eventTime");
  var today = new Date();
  var date = new Date(Date1+'T'+Time+':00');
  var difference_days = 0;
  var difference_hours = 0;
  var difference_minutes = 0;
  var difference_seconds = 0;
  var difference = '';
  var all = 0;
  
  difference_days = differenceInDays(date, today);
  difference_hours = differenceInHours(date, today) - difference_days * 24;
  difference_minutes = differenceInMinutes(date, today) - differenceInHours(date, today) * 60;
  difference_seconds = differenceInSeconds(date, today) - differenceInMinutes(date, today) * 60;
  difference = difference_days.toString() + ' Tag(e) ' + difference_hours.toString() + ':' + difference_minutes.toString() + ':' + difference_seconds.toString();
  all = difference_days+difference_hours+difference_minutes+difference_seconds;
  if (all <= 0){
    return (
      <Confetti
        width={1920}
        height={1280}
        numberOfPieces={400}
      />
    );
  }
  return difference


}


