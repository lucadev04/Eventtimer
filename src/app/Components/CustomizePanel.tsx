"use client";

import styles from "../page.module.css";
import { useEffect, useRef } from "react";
import UIkit from "uikit";

const CustomizePanel = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    UIkit.switcher(".uk-subnav");
  }, []);

  const uploadImage = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
    }
  };

  return (
    <div className="uk-container">
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
            <div>Design</div>
            <div className="uk-flex uk-flex-column">
              <button
                className="uk-button uk-button-primary"
                style={{
                  width: "11em",
                  marginBottom: "10px",
                  marginLeft: "45%",
                }}
                onClick={uploadImage}
              >
                upload image
              </button>
              <input
                type="file"
                id="file"
                ref={inputFile}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <a
                className="uk-button uk-button-primary"
                href="/background"
                style={{ width: "11em", marginLeft: "45%" }}
              >
                search images
              </a>
            </div>
            <div>Effects</div>
          </div>
        </center>
      </div>
    </div>
  );
};

export default CustomizePanel;
