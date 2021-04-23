import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router";
var FormData = require("form-data");

function Taketest({ user }) {
  const [sendingData, setsendingData] = useState(false);
  const [result, setResult] = useState();
  const history = useHistory();
  const [{ alt, src }, setImg] = useState({
    src: "",
    alt: "Upload an Image",
  });

  useEffect(() => {
    if (!user) {
      history.push("/sign-in");
    }
  }, [user]);

  const [img, setImage] = useState();

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };

  const handleSubmit = (e) => {
    setsendingData(true);
    // Library so we can send image to api
    var formData = new FormData();
    console.log("Submit method");
    // addition of image
    formData.append("IMG", img);
    console.log(formData);
    axios
      .post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data; ",
        },
      })
      .then((response) => {
        console.log(response);
        const result = response.data.result;
        setResult(result);
      })
      .catch((err) => console.log(err, "error"));

    setsendingData(false);
    e.preventDefault();
  };

  return (
    <>
      <form
        encType="multipart/form-data"
        style={{ margin: "2rem" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Container>
          <Row>
            <h1 className="form__title">Upload Image</h1>
          </Row>
          <Row>
            <h6 style={{ opacity: 0.6, marginTop: "00.5rem" }}>
              Upload images in only png/jpeg/jpg
            </h6>
          </Row>
          <Row style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            <Col className="d-flex align-items-center">
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                id="IMG"
                className="visually-hidden"
                onChange={handleImg}
                className="btn btn-dark"
              />
            </Col>
            <Col>
              <label htmlFor="photo"></label>
              <img src={src} alt={alt} style={{ height: "150px" }} />
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                type="submit"
                disabled={sendingData}
                className="btn btn-primary"
              />
            </Col>
          </Row>
        </Container>
      </form>
      <Container>
        <Row>
          <Col>
            {result == "Negative" && (
              <>
                <div className="alert alert-primary text-center" role="alert">
                  Result is Negative
                </div>
                <p className=" text-center">Stay safe, Stay Healthy</p>
              </>
            )}
            {result == "Positive" && (
              <>
                <div className="alert alert-danger  text-center" role="alert">
                  Result is Positive
                </div>
                <p className=" text-center">
                  Please Contact the nearest Doctor <br />
                  <a
                    href="https://www.google.com/search?q=doctor+near+me"
                    target="_blank"
                  >
                    Show nearest doctor
                  </a>
                </p>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Taketest;
