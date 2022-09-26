import { Card, Button, Container, Row, Col } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import img1 from "../iconPro/img3.png";
import img2 from "../iconPro/img2.png";
import img3 from "../iconPro/img5.png";
import img4 from "../iconPro/img1.png";
import img5 from "../iconPro/img4.png";
import img6 from "../iconPro/img6.png";
import profiles from "../iconPro/profil.png";
import pcs from "./profile.module.css";
import { useQuery } from "react-query";

import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

function Profile() {
  const [state] = useContext(UserContext);
  console.log(state);
  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/login");
    return response.data.data;
  });
  return (
    <Container style={{ background: "red" }} className={pcs.container}>
      <Row className={pcs.diva}>
        <div className={pcs.divb}>
          <Col className={pcs.divc}>
            <div>
              <h2>Personal info</h2>
            </div>
            <div className={pcs.dive}>
              <div className={pcs.divf}>
                <img src={img1} alt="" />
              </div>
              <div>
                <h5>{state.user.fullname}</h5>
                <span>Full name</span>
              </div>
            </div>
            <div className={pcs.dive}>
              <div className={pcs.divf}>
                <img src={img2} alt="" />
              </div>
              <div>
                <h5>{state.user.email}</h5>
                <p>Email</p>
              </div>
            </div>
            <div className={pcs.dive}>
              <div className={pcs.divf}>
                <img src={img3} alt="" />
              </div>
              <div>
                <h5>Active</h5>
                <p>Status</p>
              </div>
            </div>
            <div className={pcs.dive}>
              <div className={pcs.divf}>
                <img src={img4} alt="" />
              </div>
              <div>
                <h5>{state.user.gender}</h5>
                <p>Gender</p>
              </div>
            </div>
            <div className={pcs.dive}>
              <div className={pcs.divf}>
                <img src={img5} alt="" />
              </div>
              <div>
                <h5>{state.user.phone}</h5>
                <p>Mobile phone</p>
              </div>
            </div>
            <div className={pcs.dive}>
              <div className={pcs.divf}>
                <img src={img6} alt="" />
              </div>
              <div>
                <h5>{state.user.address}</h5>
                <p>Address</p>
              </div>
            </div>
          </Col>
          <Col className={pcs.cdp}>
            <Card
              style={{
                width: "18rem",
                background: "#1F1F1F",
                borderRadius: "5px",
                border: "none",
              }}
            >
              <Card.Img variant="top" src={profiles} />
              <Button variant="danger" style={{ marginTop: "20px" }}>
                Change Photo Profile
              </Button>
            </Card>
          </Col>
        </div>
      </Row>
    </Container>
  );
}

export default Profile;
