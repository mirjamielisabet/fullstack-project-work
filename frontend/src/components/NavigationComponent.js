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
            <Link to="/user">User</Link>
          </li>
          <li>
            <Link to="/teacher">Admin</Link>
          </li>
        </ul>
      </div>
    );
  }
}
