import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ModalLogin from "../../components/auth/modalLogin";
import ModalRegister from "../../components/auth/modalRegister";
import logo from "../../images/icon.png";
// import { FaBeer } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFilm } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { MdPayment } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import {
  default as profil,
  default as profile,
} from "../../images/profile.png";

function NavbarLogin() {
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("login")) {
      JSON.parse(localStorage.getItem("login")) === true
        ? setIsLogin(true)
        : setIsLogin(false);
    }
  }, []);
  return (
    <div className="sticky-top">
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 text-danger"
              style={{ maxHeight: "100px" }}
              // navbarScroll
            >
              <Nav.Link className="text-danger">
                <Link
                  to="/home"
                  className="my-2 text-light"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link className="text-danger">
                <Link
                  to="/tvseries"
                  className="my-2 text-light"
                  style={{ textDecoration: "none" }}
                >
                  TV Show
                </Link>
              </Nav.Link>
              <Nav.Link className="text-danger">
                <Link
                  to="/movie"
                  className="my-2 text-light"
                  style={{ textDecoration: "none" }}
                >
                  Movie
                </Link>
              </Nav.Link>
            </Nav>
            <Nav.Link
              className="me-auto my-2 my-lg-0 text-danger"
              // navbarScroll
            >
              <img src={logo} alt="" />
            </Nav.Link>
            {state.isLogin ? (
              state.user.role == "admin" ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="dark">
                    <img src={profile} alt="" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item as={Link} to="/homeAdmin">
                      <BsFilm size={20} className="text-danger " />
                      Film
                    </Dropdown.Item>
                    <Dropdown.Divider className="bg-light" />
                    <Dropdown.Item
                      onClick={() =>
                        dispatch({
                          type: "LOGOUT",
                        })
                      }
                    >
                      <FiLogOut size={20} className="text-danger " />
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown style={{ marginRight: "80px" }}>
                  <Dropdown.Toggle
                    variant="dark"
                    id="dropdown-menu-align-responsive-1"
                  >
                    <img src={profil} alt="" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="me-4 bg-dark mt-2">
                    <Dropdown.Item className="my-2 text-light">
                      <CgProfile
                        style={{ color: "red", marginRight: "10px" }}
                        size={30}
                      />
                      <Link
                        to="/profile-user"
                        className="my-2 text-light"
                        style={{ textDecoration: "none" }}
                      >
                        Profil
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="my-2 text-light">
                      <MdPayment
                        style={{ color: "red", marginRight: "10px" }}
                        size={30}
                      />
                      <Link
                        to="/payment-user"
                        className="my-2 text-light"
                        style={{ textDecoration: "none" }}
                      >
                        Pay
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      className="my-2 text-light"
                      onClick={() =>
                        dispatch({
                          type: "LOGOUT",
                        })
                      }
                    >
                      <RiLogoutCircleLine
                        style={{ color: "red", marginRight: "10px" }}
                        size={30}
                      />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )
            ) : (
              <Form className="d-flex">
                <Button
                  variant="light me-3"
                  onClick={() => {
                    setOpenModalRegister(true);
                  }}
                >
                  Register
                </Button>
                <Button
                  variant="danger me-3"
                  onClick={() => {
                    setOpenModalLogin(true);
                  }}
                >
                  login
                </Button>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalLogin
        setOpenModalLogin={setOpenModalLogin}
        showModal={openModalLogin}
      />
      <ModalRegister
        setOpenModalRegister={setOpenModalRegister}
        showModal={openModalRegister}
      />
    </div>
  );
}

export default NavbarLogin;
