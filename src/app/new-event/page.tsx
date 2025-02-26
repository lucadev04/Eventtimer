'use client'

import { useState } from 'react';
import styles from "../page.module.css";
import Sidebar from "../Components/sidebar"
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';



const event = function Event() {
    const [show, setShow] = useState(false);
    const [Eventname, setText] = useState('');
    const [Date1, setDate1] = useState('');
    const [Time, setTime] = useState('');
    var today = new Date();
    var date = new Date(Date1+'T'+Time+':00');
    var difference = '';

    function handleEvent() {
      difference = differenceInDays(date, today)+' Tage '+differenceInHours(date, today)+':'+differenceInMinutes(date, today)+':'+differenceInSeconds(date, today)
      localStorage.setItem("eventDate", Date1);
      localStorage.setItem("eventTime", Time);
      localStorage.setItem("eventName", Eventname);
    }
    return (
      <div>
        <div className="position-fixed h-100 start-0 top-0"><Sidebar/></div>
        <div className={styles.newevent}>
          <h1>New Event</h1>
        </div>
      </div>
    )
}

  export default event;