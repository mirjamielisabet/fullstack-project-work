import React from "react";
import "../App.css";

/**
 * Class returns the header component of the application.
 */
export class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <p>
          Learn English
          <span className="material-icons">circle</span>
        </p>
      </div>
    );
  }
}
