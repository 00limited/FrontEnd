import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import csstile from "./home2.module.css";
import dataFilm from "../../fakeData/data.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Row, Col, Form, Button } from "react-bootstrap";
import { API } from "../../config/api";
import { useQuery } from "react-query";

function Home2() {
  let { data: film } = useQuery("FilmCache", async () => {
    const response = await API.get("/film");
    return response.data.data;
  });
  console.log(film);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ width: "98%", background: "black", paddingLeft: "30px" }}>
      <h4 className="pb-1 pt-4 text-white">Favorite Movies</h4>
      <Slider {...settings}>
        {film?.map((item, index) => {
          return (
            <Col
              key={index}
              xl={2}
              className="pb-3 text-decoration-none"
              as={Link}
              to={"/detail/" + item?.id}
            >
              <div className="d-flex justify-content-center">
                <img
                  src={item?.thumbnail}
                  alt=""
                  style={{ width: "220px", height: "280px" }}
                />
              </div>
              <div className="d-flex align-items-center text-white fw-bold flex-column text-decoration-none">
                <p>{item?.title}</p>
                <p>{item?.year}</p>
              </div>
            </Col>
          );
        })}
      </Slider>
      <Row>
        <h4 className="pb-3 pt-2 text-white">Movies</h4>
        {film?.map((item, index) => {
          return (
            <Col
              key={index}
              xl={2}
              className="pb-3 text-decoration-none"
              as={Link}
              to={"/detail/" + item?.id}
            >
              <div className="d-flex justify-content-center">
                <img
                  src={item?.thumbnail}
                  alt=""
                  style={{ width: "230px", height: "280px" }}
                />
              </div>
              <div className="d-flex align-items-center text-white fw-bold flex-column text-decoration-none">
                <p>{item?.title}</p>
                <p>{item?.year}</p>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Home2;
