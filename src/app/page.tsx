'use client'

import styles from "./page.module.css";
import event from "./new_event";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { useEffect } from "react";


export default function Home() {
  return (
    <div className={styles.page}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" integrity="sha256-2TnSHycBDAm2wpZmgdi0z81kykGPJAkiUY+Wf97RbvY=" crossOrigin="anonymous"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js" integrity="sha256-gOQJIa9+K/XdfAuBkg2ONAdw5EnQbokw/s2b8BqsRFg=" crossOrigin="anonymous"></script>
      <header className={styles.header}>
        <p>{event()}</p>
      </header>
      <main className={styles.main}>
        <h1>{calcDate()}</h1>
      </main>
    </div>
  );
}

function calcDate(){
  var Date1 = localStorage.getItem("eventDate");
  var Time = localStorage.getItem("eventTime");
  var today = new Date();
  var date = new Date(Date1+'T'+Time+':00');
  var difference = '';
  
  difference = differenceInDays(date, today)+' Tage '+ differenceInHours(date, today)+':'+ differenceInMinutes(date, today)+':'+ differenceInSeconds(date, today)
  return difference

}


