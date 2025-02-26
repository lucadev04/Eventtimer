import Link from 'next/link'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import styles from "./page.module.css";
import event from "./pages/new-event";
import Sidebar from "./Components/sidebar"

import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { useEffect, useState } from "react";
import Confetti from 'react-confetti'


function Home() {
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/blog/hello-world">Blog Post</Link>
          </li>
        </ul>
      )
}

export default Home

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