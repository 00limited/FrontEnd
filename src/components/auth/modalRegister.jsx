import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// import ModalLogin from "../../response/Modal/modalLogin";

import { API } from "../../config/api";

function ModalRegister(props) {
  function handleClose() {
    props.setOpenModalRegister(false);
  }
  const [openModalLogin, setOpenModalLogin] = useState(false);

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    role: "",
  });

  const { fullname, email, password, gender, phone, address, role } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);
      console.log(response);

      // Handling response here
      if (response.data.code === 200) {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        handleClose();
        setMessage(alert);
        setForm({
          fullname: "",
          email: "",
          password: "",
          gender: "",
          phone: "",
          address: "",
          role: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      console.log(error);
    }
  });
  return (
    <div>
      <Modal
        show={props.showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton
          className="bg-dark"
          style={{ border: "none" }}
        >
          <Modal.Title className="text-light">
            <h2>Register</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ border: "none" }} className="bg-dark">
          {message && message}
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
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
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
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                className="mt-3"
                type="text"
                placeholder="Full Name"
                value={fullname}
                name="fullname"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                className="mt-3"
                type="text"
                placeholder="Gender"
                value={gender}
                name="gender"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                className="mt-3"
                type="text"
                placeholder="Phone"
                value={phone}
                name="phone"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                className="mt-3"
                type="text"
                placeholder="Address"
                value={address}
                name="address"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                className="mt-3"
                type="text"
                placeholder="role"
                value={role}
                name="role"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Button variant="danger text-light w-100 mt-3" type="submit">
              Register
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{ border: "none" }}
          className="bg-dark d-flex justify-content-center"
        >
          <p className="text-light">
            {/* Already have an account ? klik <a href="#">Here</a> */}
          </p>
        </Modal.Footer>
        {/* <ModalLogin
          setOpenModalLogin={setOpenModalLogin}
          showModal={openModalLogin}
        /> */}
      </Modal>
    </div>
  );
}

export default ModalRegister;
