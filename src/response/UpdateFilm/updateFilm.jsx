import { Form, Container, InputGroup, Col, Button } from "react-bootstrap";
import icons1 from "../iconPro/Vector.png";
import fm from "./uploadfile.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";

import { API } from "../../config/api";

function UpdateFilm() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [film, setFilm] = useState({}); //Store film data
  const [form, setForm] = useState({
    thumbnail: "",
    title: "",
    year: "",
    description: "",
    linkfilm: "",
  }); //Store product data

  // Fetching detail product data by id from database
  let { data: films, refetch } = useQuery("filmCache", async () => {
    const response = await API.get("/film/" + id);
    return response.data.data;
  });
  // Fetching category data
  let { data: categoriesData, refetch: refetchCategories } = useQuery(
    "categoriesCache",
    async () => {
      const response = await API.get("/categories");
      return response.data.data;
    }
  );

  useEffect(() => {
    if (films) {
      setForm({
        ...form,
        title: films.title,
        year: films.year,
        description: films.description,
        linkfilm: films.linkfilm,
      });
      setFilm(films);
    }

    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [films]);

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked === true) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem !== id;
      });
      setCategoryId(newCategoryId);
    }
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const formData = new FormData();
      // if (preview) {
      //   formData.set("thumbnail", form?.preview[0], form?.preview[0]?.name);
      // }
      formData.set("title", form.title);
      formData.set("description", form.description);
      formData.set("year", form.year);
      formData.set("linkfilm", form.linkfilm);
      formData.set("category_id", categoryId);
      console.log(categoryId);

      // Insert film data
      const response = await API.patch("/film/" + film.id, formData);

      console.clear();
      console.log(films);

      if (response.data.code === 200) {
        navigate("/homeAdmin");
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const newCategoryId = film?.categories?.map((item) => {
      return item.id;
    });

    setCategoryId(newCategoryId);
  }, [film]);

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/homeAdmin");
  };

  return (
    <div>
      <div className={fm.container}>
        <Container>
          <h1>Update Film</h1>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            {!preview ? (
              <div>
                <img
                  src={form?.thumbnail}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <Form.Group>
              <Col className={fm.formName}>
                <div className={fm.title}>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={form?.title}
                    name="title"
                    onChange={handleChange}
                    className="bg-dark"
                    style={{ color: "white" }}
                  />
                </div>
                <div className={fm.attact}>
                  <InputGroup>
                    <Form.Control
                      type="file"
                      id="upload"
                      name="thumbnail"
                      value=""
                      onChange={handleChange}
                    />
                    <InputGroup.Text id="basic-addon1">
                      <img
                        src={icons1}
                        alt=""
                        style={{ height: "20px", padding: "0" }}
                      />
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              </Col>
            </Form.Group>
            <Form.Group
              style={{
                paddingBottom: "10px",
                paddingTop: "20px",
                color: "white",
              }}
            >
              <Form.Control
                type="text"
                placeholder="year"
                value={form?.year}
                name="year"
                onChange={handleChange}
                className="bg-dark"
                style={{ color: "white" }}
              />
            </Form.Group>
            <Form.Group>
              <div className="card-form-input mt-4 px-2 py-1 pb-2">
                <div
                  className="text-secondary mb-1"
                  style={{ fontSize: "15px" }}
                >
                  Category
                </div>
                {film &&
                  categories?.map((item, index) => (
                    <label className="checkbox-inline me-4" key={index}>
                      <input
                        categoryId={categoryId}
                        type="checkbox"
                        value={item.id}
                        onClick={handleChangeCategoryId}
                      />
                      {item?.name}
                    </label>
                  ))}
              </div>
            </Form.Group>
            <Form.Group style={{ paddingBottom: "10px", paddingTop: "20px" }}>
              <Form.Control
                as="textarea"
                rows={7}
                value={form?.description}
                name="description"
                onChange={handleChange}
                placeholder="description"
                style={{ resize: "none", color: "white" }}
                className="bg-dark"
              />
            </Form.Group>
            <Form.Group>
              <Col className={fm.formName}>
                <div className={fm.title}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={form?.title}
                    name="title"
                    onChange={handleChange}
                    className="bg-dark"
                    style={{ color: "white" }}
                  />
                </div>
                <div className={fm.attact}>
                  <InputGroup>
                    <Form.Control
                      type="file"
                      value={form?.thumbnail}
                      id="upload"
                      name="thumbnail"
                      onChange={handleChange}
                    />
                    <InputGroup.Text id="basic-addon1">
                      <img
                        src={icons1}
                        alt=""
                        style={{ height: "20px", padding: "0" }}
                      />
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              </Col>
            </Form.Group>
            <Form.Group
              style={{
                paddingBottom: "10px",
                paddingTop: "20px",
                color: "white",
              }}
            >
              <Form.Control
                type="text"
                placeholder="Link"
                name="linkfilm"
                value={form?.linkfilm}
                onChange={handleChange}
                className="bg-dark"
                style={{ color: "white" }}
              />
            </Form.Group>

            <Button
              variant="danger"
              type="submit"
              style={{
                marginTop: "20px",
                width: "100px",
                float: "right",
                color: "white",
              }}
            >
              Save
            </Button>
          </Form>
          <Button
            variant="danger"
            type="submit"
            style={{
              marginTop: "20px",
              marginRight: "20px",
              width: "100px",
              float: "right",
              color: "white",
            }}
            onClick={handleBack}
          >
            Cancel
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default UpdateFilm;
