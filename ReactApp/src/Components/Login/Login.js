import axios from "axios";
import React, { Component, useState } from "react";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setalert] = useState("");
  const handleChangeEmail = (e) => {
    setemail(e);
  };

  const handleChangePassword = (e) => {
    setpassword(e);
  };

  const handleSubmit = (e) => {
    //request to server
    axios
      .post("/signin", { email, password })
      .then((response) => {
        console.log(response.data);

        if (response.data.res !== "Successful") {
          //setting alert message if some issue is that
          setalert(response.data.res);
        }
      })
      .catch((error) => console.log(error));

    setemail("");
    setpassword("");
    e.preventDefault();
  };

  return (
    <form>
      <h3>Sign In</h3>
      {alert ? (
        <div class="alert alert-danger " role="alert">
          {alert}
        </div>
      ) : null}
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => handleChangeEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => handleChangePassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block"
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </button>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  );
}
