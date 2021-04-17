import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Signup() {
  const [activeTab, setactiveTab] = useState("Individual");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [number, setnumber] = useState("");

  const history = useHistory();

  const handleTabchangeHospital = () => {
    setactiveTab("Hospital");
  };

  const handleTabchangeIndividual = () => {
    setactiveTab("Individual");
  };

  const handleSubmit = (e) => {
    if (activeTab === "Individual") {
      axios
        .post("http://localhost:5000/signup", { name, email, password })
        .then((response) => {
          if (response.data.res === "Successful") {
            console.log("DONE");
            history.push("/sign-in");
            setname("");
            setemail("");
            setpassword("");
            setnumber("");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:5000/signupHospital", {
          name,
          email,
          password,
          number,
        })
        .then((response) => {
          if (response.data.res === "Successful") {
            console.log("DONE");
            history.push("/sign-in");
            setname("");
            setemail("");
            setpassword("");
            setnumber("");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    e.preventDefault();
  };

  return (
    <>
      <div className="tabsContainerSignup">
        <div className="tabIndividual">
          {activeTab === "Individual" ? (
            <div className="active">Individual</div>
          ) : (
            <div
              onClick={handleTabchangeIndividual}
              style={{ cursor: "pointer" }}
            >
              Individual
            </div>
          )}
        </div>
        <div className="tabHospital">
          {activeTab === "Hospital" ? (
            <div className="active">Hospital</div>
          ) : (
            <div
              onClick={handleTabchangeHospital}
              style={{ cursor: "pointer" }}
            >
              Hospital
            </div>
          )}
        </div>
      </div>
      {activeTab === "Individual" ? (
        <form>
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => setname(e.target.value)}
              value={name}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      ) : (
        <form>
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>Hospital Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Hospital name"
              onChange={(e) => setname(e.target.value)}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Number"
              onChange={(e) => setnumber(e.target.value)}
              value={number}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <Link to="/sign-in">sign in?</Link>
          </p>
        </form>
      )}
    </>
  );
}

export default Signup;
