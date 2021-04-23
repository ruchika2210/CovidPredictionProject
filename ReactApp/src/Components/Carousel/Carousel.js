import React from "react";
import { Carousel } from "react-bootstrap";
import "../Carousel/Carousel.css";

function Carouselhome() {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 Image"
            src=" https://production-tcf.imgix.net/app/uploads/2020/09/02133407/halting-workplace-01.png?auto=format%2Ccompress&q=80&fit=crop&w=1200&h=600"
            height="500px"
            width="140px"
            alt="First slide"
          />

          <Carousel.Caption>
            <div className="Caption">
              <h1>Safety First, So you Last </h1>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="https://theindianpractitioner.com/wp-content/uploads/2020/07/Formulation-Based-on-Natural-Molecules-to-Combat-COVID-19.jpg"
            height="500px"
            width="150px"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.medscape.com/thumbnail_library/gty_210407_covid_vaccine_vials_800x450.jpg"
            height="500px"
            width="120px"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carouselhome;
