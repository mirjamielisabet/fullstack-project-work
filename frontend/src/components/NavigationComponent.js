import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

/**
 * Class returns the navigation bar component of the application.
 */
export class NavigationBar extends React.Component {
  render() {
    return (
      <div className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Learner</Link>
          </li>
          <li>
            <Link to="/admins">Teacher</Link>
          </li>
        </ul>
      </div>
    );
  }
}
