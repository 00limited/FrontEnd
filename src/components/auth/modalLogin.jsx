import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ModalRegister from "./modalRegister";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useMutation } from "react-query";

import { API } from "../../config/api";

function ModalLogin(props) {
  const [openModalRegister, setOpenModalRegister] = useState(false);
  function handleClose() {
    props.setOpenModalLogin(false);
  }

  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);
      console.log(response);
      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        // Status check
        // if (response.data.data.role === "admin") {
        //   navigate("/payment-admin");
        // } else {
        //   navigate("/home-user");
        // }
        handleClose();
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );

      setMessage(alert);
      console.log(error);
    }
  });
  return (
    <Modal
      show={props.showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="bg-dark" style={{ border: "none" }}>
        <Modal.Title className="text-light">
          <h2>Login</h2>
        </Modal.Title>
      </Modal.Header>
      {message && message}
      <Modal.Body style={{ border: "none" }} className="bg-dark">
        <Form className="bg-dark" onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              className="mt-3"
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              autoFocus
            />
          </Form.Group>
          <Button variant="danger text-light w-100 mt-3" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer
        style={{ border: "none" }}
        className="bg-dark d-flex justify-content-center"
      >
        <p className="text-light">
          Don't have an account ? klik
          <span
            onClick={() => {
              setOpenModalRegister(true);
            }}
            style={{
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            <a href="#">Here</a>
          </span>
        </p>
      </Modal.Footer>
      <ModalRegister
        setOpenModalRegister={setOpenModalRegister}
        showModal={openModalRegister}
      />
    </Modal>
  );
}

export default ModalLogin;
