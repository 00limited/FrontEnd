import video1 from "../../video/video1.mp4";
import dtl from "./detailfilmadmin.module.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import csslide from "./detailfilmadmin.module.css";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

import { API } from "../../config/api";

function DetailFAdmin() {
  let navigete = useNavigate();

  const handleEdit = (id) => {
    navigete("/edit-film/" + id);
  };
  let { id } = useParams();
  let { data: film } = useQuery("productCache", async () => {
    const response = await API.get("/film/" + id);
    return response.data.data;
  });
  console.log(film);

  return (
    <div>
      <div className={dtl.divUnit}>
        <div className={dtl.divMain}>
          <iframe
            className="mt-0"
            width="100%"
            height="455"
            src={film?.linkfilm}
            title={film?.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          {/* <video width="400" controls>
            <source src={video1} type="video/mp4" />
            Your browser does not support HTML video.
          </video> */}
        </div>
      </div>
      <div>
        <div
          className="d-flex justify-content-end "
          style={{ marginRight: "120px" }}
        >
          <Button
            style={{ width: "200px" }}
            className="bg-danger"
            onClick={() => {
              handleEdit(film.id);
            }}
          >
            Add Episode
          </Button>
        </div>
        <Container>
          <Row style={{ width: "100%", paddingBottom: "20px" }}>
            <Col className="d-flex " md={8}>
              <Card style={{ width: "100%", border: "none" }}>
                <Card.Body
                  className="p-2 d-flex text-light"
                  style={{ width: "100%", background: "black" }}
                >
                  <div>
                    <img
                      src={film?.thumbnail}
                      alt=""
                      style={{ width: "200px" }}
                    />
                  </div>
                  <div className="p-2">
                    <Card.Title style={{ fontSize: "48px" }}>
                      {film?.title}
                    </Card.Title>
                    <div className="d-flex w-6 ">
                      <p className="pt-4 mx-4">{film?.year}</p>
                      <span
                        className="px-3 m-4  border border-secondary text-light rounded"
                        style={{
                          display: "flex",
                          textAlign: "center",
                        }}
                      >
                        TV Series
                      </span>
                    </div>
                    <Card.Text className="mt-4">{film?.description}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card
                className="text-light"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  background: "black",
                }}
              >
                <div className={csslide.bdySlide}>
                  <iframe
                    className="mt-0"
                    width="100%"
                    height="255"
                    src={film?.linkfilm}
                    title={film?.title}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                  <p>{film?.title}</p>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default DetailFAdmin;
