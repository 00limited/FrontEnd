import { Container, Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { MdPayment } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import profil from "../../images/profile.png";
import logo from "../../images/icon.png";

function NavbarUser() {
  return (
    <div>
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
                  to="/home-user"
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
                <Dropdown.Item className="my-2 text-light" as={Link} to="/home">
                  <RiLogoutCircleLine
                    style={{ color: "red", marginRight: "10px" }}
                    size={30}
                  />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarUser;
