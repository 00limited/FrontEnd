import img1 from "../../images/iconHome.png";
import Button from "react-bootstrap/Button";
import hm1 from "./home1.module.css";
import { Row, Col } from "react-bootstrap";

function BgTop() {
  return (
    <div className={hm1.contain1}>
      <Row className={hm1.MainH}>
        <div className={hm1.Bdyhome}>
          <img src={img1} alt="" style={{ paddingBottom: "30px" }} />
          <p>
            Money Heist is a crime drama on Netflix - originally called La Casa
            de Papel. Money Heist season 3 has just been released by the
            streaming service. The plot reads: "Eight thieves take hostages and
            lock themselves in the Royal Mint of Spain as a criminal mastermind
            manipulates the police to carry out his plan."
          </p>
          <div className="d-flex w-6 ">
            <p className="pt-4 mx-4">2017</p>
            <span
              className="px-3 m-4  border border-secondary  rounded"
              style={{
                display: "flex",
                textAlign: "center",
              }}
            >
              TV Series
            </span>
          </div>
          <Button size="lg" className={hm1.buttonW}>
            WATCH NOW !
          </Button>
        </div>
      </Row>
    </div>
  );
}

export default BgTop;
