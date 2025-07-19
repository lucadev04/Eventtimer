"use client";

import "uikit/dist/css/uikit.min.css";
import "uikit/dist/css/uikit-core.min.css";
import "uikit/dist/js/uikit.min.js";

const background = function Background() {
  return (
    <div
      className="uk-container uk-container-expand"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#212529",
      }}
    >
      <div className="uk-margin" style={{ marginTop: "3em" }}>
        <form className="uk-search uk-search-default">
          <input
            className="uk-search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <span uk-search-icon="true"></span>
        </form>
      </div>
    </div>
  );
};

export default background;
