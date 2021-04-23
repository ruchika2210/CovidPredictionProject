import React from "react";
import { Carousel } from "react-bootstrap";

function Carouselhome() {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://theindianpractitioner.com/wp-content/uploads/2020/07/Formulation-Based-on-Natural-Molecules-to-Combat-COVID-19.jpg"
            height="500px"
            width="140px"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="https://production-tcf.imgix.net/app/uploads/2020/09/02133407/halting-workplace-01.png?auto=format%2Ccompress&q=80&fit=crop&w=1200&h=600"
            height="500px"
            width="150px"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://ohsonline.com/-/media/OHS/OHS/Images/2020/12/kusti.jpg"
            height="500px"
            width="140px"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carouselhome;
