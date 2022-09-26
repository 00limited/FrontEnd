import { Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config/api";
import { useQuery } from "react-query";

function HomeAdmin() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  let { data: category } = useQuery("categoryCache", async () => {
    const response = await API.get("/categories");
    return response.data.data;
  });

  function handleChangeSelect(e) {
    e.preventDefault();
    setCategoryFilter(e.target.value);
  }

  return (
    <div>
      <Row className="py-5 px-5 ">
        <div className="pb-5 text-white d-flex justify-content-between">
          <div className="d-flex inline">
            <h1>List Film</h1>
            <Form.Select
              className="p-2 mt-1 ms-4 bg-dark text-light"
              style={{ width: "120px", height: "40px" }}
              onChange={handleChangeSelect}
            >
              <option value="all">All</option>
              <option value="movies">Movies</option>
              <option value="tv-series">Tv Series</option>
            </Form.Select>
          </div>
          <div class="d-flex">
            <Button
              className="p-0 bg-danger"
              style={{ width: "150px", height: "35px" }}
              as={Link}
              to="/uploadfilm-admin"
            >
              Add Film
            </Button>
          </div>
        </div>
        {categoryFilter == "all" ? (
          <>
            <Row>
              <h4 className="pb-3 text-white">Movies</h4>
              {category &&
                category[0]?.film?.map((item, index) => {
                  return (
                    <Col
                      key={index}
                      xl={3}
                      className="pb-3 text-decoration-none"
                      as={Link}
                      to={"/detailFilmAdmin/" + item?.id}
                    >
                      <div className="d-flex justify-content-center">
                        <img
                          src={item?.thumbnail}
                          alt=""
                          style={{ width: "200px" }}
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
            <Row>
              <h4 className="pb-3 text-white">TV Series</h4>
              {category &&
                category[1]?.film?.map((item, index) => {
                  return (
                    <Col
                      key={index}
                      xl={3}
                      className="pb-3 text-decoration-none"
                      as={Link}
                      to={"/detailFilmAdmin/" + item?.id}
                    >
                      <div className="d-flex justify-content-center">
                        <img
                          src={item?.thumbnail}
                          alt=""
                          style={{ width: "200px" }}
                        />
                      </div>
                      <div className="d-flex align-items-center text-white fw-bold flex-column text-decoration-none">
                        <p>{item.title}</p>
                        <p>{item.year}</p>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </>
        ) : categoryFilter == "movies" ? (
          <Row>
            <h4 className="pb-3 text-white">Movies</h4>
            {category &&
              category[0]?.film?.map((item, index) => {
                return (
                  <Col
                    key={index}
                    xl={3}
                    className="pb-3 text-decoration-none"
                    as={Link}
                    to={"/detailFilmAdmin/" + item?.id}
                  >
                    <div className="d-flex justify-content-center">
                      <img
                        src={item?.thumbnail}
                        alt=""
                        style={{ width: "200px" }}
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
        ) : (
          <Row>
            <h4 className="pb-3 text-white">TV Series</h4>
            {category &&
              category[1]?.film?.map((item, index) => {
                return (
                  <Col
                    key={index}
                    xl={3}
                    className="pb-3 text-decoration-none"
                    as={Link}
                    to={"/detailFilmAdmin/" + item?.id}
                  >
                    <div className="d-flex justify-content-center">
                      <img
                        src={item?.thumbnail}
                        alt=""
                        style={{ width: "200px" }}
                      />
                    </div>
                    <div className="d-flex align-items-center text-white fw-bold flex-column text-decoration-none">
                      <p>{item.title}</p>
                      <p>{item.year}</p>
                    </div>
                  </Col>
                );
              })}
          </Row>
        )}
      </Row>
    </div>
  );
}

export default HomeAdmin;
