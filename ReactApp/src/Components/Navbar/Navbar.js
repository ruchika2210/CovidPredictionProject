import React from "react";
import { Link, useHistory } from "react-router-dom";

function Navbar({ user, userType }) {
  console.log(user, "navbar user");

  const history = useHistory();

  const handleUserClick = () => {
    history.push("/user");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <Link className="navbar-brand" to={"/"}>
          Covid Detection System
        </Link>
        <Link className="navbar-brand" to={"/take-test"}>
          Take test
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          {user ? (
            <>
              {userType === "Individual" ? (
                <div
                  className="navbar-nav ml-auto"
                  style={{ cursor: "pointer" }}
                  onClick={handleUserClick}
                >
                  Hello, {user.name}
                </div>
              ) : (
                <div
                  className="navbar-nav ml-auto"
                  style={{ cursor: "pointer" }}
                  onClick={handleUserClick}
                >
                  {user.hospitalname}
                </div>
              )}
            </>
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
