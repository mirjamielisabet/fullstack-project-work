import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export class NavigationBar extends React.Component {
  render() {
    return (
      <div className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user">Learner</Link>
          </li>
          <li>
            <Link to="/admin">Teacher</Link>
          </li>
        </ul>
      </div>
    );
  }
}
