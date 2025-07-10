"use client";

import styles from "../page.module.css";
import { useEffect } from "react";
import UIkit from "uikit";

const CustomizePanel = () => {
  useEffect(() => {
    // Manuelle Initialisierung (oft reicht das, UIkit erkennt den Switcher dann)
    UIkit.switcher(".uk-subnav");
  }, []);
  return (
    <div className={styles.panel}>
      <center>
        <ul className="uk-subnav uk-subnav-pill" uk-switcher>
          <li>
            <a href="#">Design</a>
          </li>
          <li>
            <a href="#">Background</a>
          </li>
          <li>
            <a href="#">Effects</a>
          </li>
        </ul>

        <div className="uk-switcher uk-margin">
          <div>Hello!</div>
          <div>Hello again!</div>
          <div>Bazinga!</div>
        </div>
      </center>
    </div>
  );
};

export default CustomizePanel;
