import React from "react";
import "../App.css";
import CopyrightIcon from "@mui/icons-material/Copyright";

/**
 * Class returns the footer component of the application.
 */
export class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <span>
          Copyright{" "}
          <CopyrightIcon
            style={{ fontSize: "1em", position: "relative", top: "2.5px" }}
          />{" "}
          Mirjami Laiho 2022
        </span>
      </div>
    );
  }
}
