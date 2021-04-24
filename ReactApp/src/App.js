import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";

import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/Signup";
import Taketest from "./Components/TakeTest/Taketest";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import UserScreen from "./Components/UserScreen/UserScreen";

function App() {
  const [user, setuser] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    console.log(user, userType, "set state");
  }, [user, userType]);

  return (
    <>
      <Navbar
        user={user}
        setuser={setuser}
        userType={userType}
        setUserType={setUserType}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/sign-in">
          <Login
            user={user}
            setuser={setuser}
            userType={userType}
            setUserType={setUserType}
          />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/take-test">
          <Taketest user={user} />
        </Route>
        <Route path="/user">
          <UserScreen user={user} userType={userType} setuser={setuser} />
        </Route>

        {/* <Route path="/carousel">
        <Carousel></Carousel>
      </Route> */}
      </Switch>
    </>
  );
}

export default App;
