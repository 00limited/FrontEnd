import icon from "../../images/icon.png";
import profile from "../../images/profile.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import csNav from "./navbar.module.css";
import { BsFilm } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdPayment } from "react-icons/md";

function NavbarAdmin() {
  return (
    <div>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Brand
              as={Link}
              to="/homeAdmin"
              className="me-auto my-2 my-lg-0"
            >
              <img src={icon} alt="" className={csNav.brand} />
            </Navbar.Brand>
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
                <Dropdown.Item as={Link} to="/home">
                  <FiLogOut size={20} className="text-danger " />
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarAdmin;
