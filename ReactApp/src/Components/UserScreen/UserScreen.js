import axios from "axios";
import FormData from "form-data";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

function UserScreen({ user, userType }) {
  const [name, setname] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [toggle, setToggle] = useState(false);

  const handleSubmit = () => {
    console.log("Called");
    // Library so we can send changes to api
    var formData = new FormData();
    console.log("Submit method");
    formData.append("id", user._id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("userType", userType);
    console.log(formData);
    axios
      .post("http://localhost:5000/edituser", formData, {
        headers: {
          "Content-Type": "multipart/form-data; ",
        },
      })
      .then((response) => {
        console.log(response);
        const result = response.data.result;
        console.log(result);
      })
      .catch((err) => console.log(err, "error"));
  };

  return (
    <div>
      <Container>
        <div className="mt-5">
          <Row>
            <h4>User Details:</h4>
          </Row>

          <Row className="mt-2">
            <Col xs={3}>
              <p>Name:</p>
            </Col>
            <Col xs={3}>
              <Row>
                {toggle ? (
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  ></input>
                ) : (
                  <p>{user.name}</p>
                )}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <p>Email:</p>
            </Col>
            <Col xs={3}>
              <Row>
                {toggle ? (
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  ></input>
                ) : (
                  <p>{user.email}</p>
                )}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              {toggle ? (
                <button
                  type="button"
                  class="btn btn-outline-success"
                  onClick={() => handleSubmit()}
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  class="btn btn-outline-warning"
                  onClick={() => setToggle(true)}
                >
                  Edit details
                </button>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default UserScreen;
