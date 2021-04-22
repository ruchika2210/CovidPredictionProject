import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user }) {
  console.log(user, "navbar user");

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <Link className="navbar-brand" to={"/sign-in"}>
          CovidPredictionSystem
        </Link>
        <Link className="navbar-brand" to={"/take-test"}>
          Take test
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          {user ? (
            <div className="navbar-nav ml-auto">Hello, {user.name}</div>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>
                  Sign up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
