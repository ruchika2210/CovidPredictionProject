import axios from "axios";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import covidPng from "../../Images/covid.png";
import { useHistory } from "react-router-dom";

export default function Login({ user, setuser, setUserType }) {
  const history = useHistory();
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
      .post("http://localhost:5000/signin", { email, password })
      .then((response) => {
        console.log(response.data);

        if (response.data.res != "Successful") {
          //setting alert message if some issue is that
          setalert(response.data.res);
        } else {
          setalert(null);
          const userObj = response.data.user;

          delete userObj["password"];
          delete userObj["__v"];

          console.log(userObj);
          setuser(userObj);
          setUserType(response.data.type);
          history.push("/");
        }
      })
      .catch((error) => console.log(error));

    setemail("");
    setpassword("");
    e.preventDefault();
  };

  return (
    <div className="loginSignupContainer">
      <div className="loginImageContainer">
        <img
          style={{ width: "600px" }}
          src={covidPng}
          className="LoginSignupPng"
        />
      </div>
      <div className="d-flex align-items-center justify-content-center h-100 ">
        <Card
          style={{ padding: "2rem" }}
          className="shadow p-3 mb-5 bg-white rounded w-25 text-left"
        >
          <Card.Body>
            <form>
              <h3 className="text-center">Sign In</h3>
              {alert ? (
                <div className="alert alert-danger " role="alert">
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

              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
