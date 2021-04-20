import React from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";

import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/Signup";
import Taketest from "./Components/TakeTest/Taketest";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/sign-in" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/take-test" component={Taketest} />
      </Switch>
    </>
  );
}

export default App;
