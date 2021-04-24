import axios from "axios";

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

function UserScreen({ user, userType, setuser }) {
  const [name, setname] = useState(user.name);
  const [hospitalname, sethospitalname] = useState(user.hospitalname);
  const [hospitalContactNumber, setHospitalContactNumber] = useState(
    user.contactnumber
  );
  const [email, setemail] = useState(user.email);
  const [toggle, setToggle] = useState(false);
  const [staff, setStaff] = useState(user.staff);

  const [editStaff, setEditStaff] = useState();
  const [addStaff, setaddStaff] = useState({ name: "", number: "" });
  const [currentlyEditing, setcurrentlyEditing] = useState({
    index: "",
    name: "",
    number: "",
  });

  useEffect(() => {
    console.log(staff);
  }, [staff]);

  const handleStaffEditSave = () => {
    console.log("clicked");
    staff[currentlyEditing.index] = {
      name: currentlyEditing.name,
      number: currentlyEditing.number,
    };
    setEditStaff(null);
  };

  const handleDeleteStaff = (index) => {
    console.log("clicked");
    const temp = staff;
    delete temp[index];
    const t = temp.filter(function (a) {
      return typeof a !== "undefined";
    });
    console.log(t);
    setStaff(t);
    console.log(staff);
  };

  const addEntryToStaff = () => {
    console.log("clicked");
    let temp = staff;
    temp.push(addStaff);
    setStaff(temp);
    setaddStaff({ name: "", number: "" });
    console.log(staff);
  };

  const handleSaveChanges = () => {
    console.log("updating");
    axios
      .post("http://localhost:5000/editstaff", {
        id: user._id,
        staff,
      })
      .then((response) => {
        const userObj = response.data.user;
        delete userObj["password"];
        delete userObj["__v"];
        console.log(userObj, "userobj");
        setuser(userObj);

        console.log(response);
      })
      .catch((err) => console.log(err, "error"));
  };

  const handleSubmit = () => {
    console.log("Inside method");
    axios
      .post("http://localhost:5000/edituser", {
        id: user._id,
        name,
        email,
        userType,
      })
      .then((response) => {
        const userObj = response.data.user;
        delete userObj["password"];
        delete userObj["__v"];
        setuser(userObj);
        setToggle(false);
      })
      .catch((err) => console.log(err, "error"));
  };

  return (
    <div>
      <Container>
        <div className="mt-5">
          {userType === "Individual" && (
            <>
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
                        id="name"
                        name="name"
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
                        name="email"
                        id="email"
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
                      type="submit"
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
            </>
          )}

          {userType === "Hospital" && (
            <>
              <Row>
                <h4>Details:</h4>
              </Row>

              <Row className="mt-2">
                <Col xs={3}>
                  <p>Hospital Name:</p>
                </Col>
                <Col xs={3}>
                  <Row>
                    {toggle ? (
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter name"
                        value={hospitalname}
                        onChange={(e) => sethospitalname(e.target.value)}
                      ></input>
                    ) : (
                      <p>{user.hospitalname}</p>
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
                <Col xs={3}>
                  <p>Number:</p>
                </Col>
                <Col xs={3}>
                  <Row>
                    {toggle ? (
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Enter Number"
                        value={hospitalContactNumber}
                        onChange={(e) =>
                          setHospitalContactNumber(e.target.value)
                        }
                      ></input>
                    ) : (
                      <p>{hospitalContactNumber}</p>
                    )}
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  {toggle ? (
                    <button
                      type="submit"
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
              <Row className="mt-5">
                <h5>Staff</h5>
              </Row>
              <Table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Number</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((person, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      {editStaff == index ? (
                        <>
                          <td>
                            <input
                              type="text"
                              value={currentlyEditing.name}
                              onChange={(e) => {
                                setcurrentlyEditing({
                                  index,
                                  name: e.target.value,
                                  number: person.number,
                                });
                              }}
                            />
                          </td>
                          <td>
                            {" "}
                            <input
                              type="number"
                              value={currentlyEditing.number}
                              onChange={(e) => {
                                setcurrentlyEditing({
                                  index,
                                  name: person.name,
                                  number: e.target.value,
                                });
                              }}
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{person.name}</td>
                          <td>{person.number}</td>
                        </>
                      )}

                      <td>
                        {editStaff == index ? (
                          <button
                            className="btn btn-success"
                            onClick={() => handleStaffEditSave()}
                          >
                            Save
                          </button>
                        ) : (
                          <>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setEditStaff(index);
                                setcurrentlyEditing({
                                  index,
                                  name: person.name,
                                  number: person.number,
                                });
                              }}
                            >
                              Edit
                            </button>{" "}
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteStaff(index)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row"></th>
                    <td>
                      <input
                        type="text"
                        value={addStaff.name}
                        placeholder="Enter name to add"
                        onChange={(e) => {
                          setaddStaff({
                            name: e.target.value,
                            number: addStaff.number,
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={addStaff.number}
                        placeholder="Enter number"
                        onChange={(e) => {
                          setaddStaff({
                            name: addStaff.name,
                            number: e.target.value,
                          });
                        }}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => addEntryToStaff()}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <button
                type="button"
                class="btn btn-success"
                onClick={() => handleSaveChanges()}
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default UserScreen;
