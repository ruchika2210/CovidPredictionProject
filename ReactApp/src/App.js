import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";

import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/Signup";
import Taketest from "./Components/TakeTest/Taketest";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [user, setuser] = useState("");

  useEffect(() => {
    console.log(user, "set state");
  }, [user]);

  return (
    <>
      <Navbar user={user} setuser={setuser} />
      <Switch>
        <Route exact path="/">
          <Login user={user} setuser={setuser} />
        </Route>
        <Route path="/sign-in">
          <Login user={user} setuser={setuser} />
        </Route>
        <Route path="/sign-up">
          <SignUp user={user} setuser={setuser} />
        </Route>
        <Route path="/take-test">
          <Taketest user={user} setuser={setuser} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
