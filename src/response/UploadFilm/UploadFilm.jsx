import { Form, Container, InputGroup, Col, Button } from "react-bootstrap";
import icons1 from "../iconPro/Vector.png";
import fm from "./uploadfile.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";

import { API } from "../../config/api";

function UploadFilm() {
  let navigate = useNavigate();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    name: "",
    thumbnail: "",
    year: "",
    category_id: "",
    description: "",
    linkfilm: "",
  }); //Store product data

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
    console.log(categoryId);
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

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
      formData.set("title", form.title);
      formData.set("description", form.description);
      formData.set("year", form.year);
      formData.set("linkfilm", form.linkfilm);
      formData.set("category_id", categoryId);

      console.log(form);

      // Insert product data
      const response = await API.post("/film", formData, config);
      console.log(response);

      navigate("/homeAdmin");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <div className={fm.container}>
        <Container>
          <h1>Add Film</h1>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
            <Form.Group>
              <Col className={fm.formName}>
                <div className={fm.title}>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
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
                {categories.map((item, index) => (
                  <label className="checkbox-inline me-4" key={index}>
                    <input
                      type="checkbox"
                      value={item.id}
                      onClick={handleChangeCategoryId}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
              {/* <Form.Group
                as={Col}
                style={{
                  paddingBottom: "10px",
                  paddingTop: "20px",
                  color: "white",
                }}
              >
                <Form.Select
                  defaultValue="Choose..."
                  className="bg-dark text-secondary"
                  placeholder="Select Movie"
                  name="category"
                  onClick={handleChangeCategoryId}
                >
                  <option>Category</option>
                  {categories?.map((item, index) => (
                    <option key={index} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group> */}
            </Form.Group>
            <Form.Group style={{ paddingBottom: "10px", paddingTop: "20px" }}>
              <Form.Control
                as="textarea"
                rows={7}
                name="description"
                onChange={handleChange}
                placeholder="Descriptions"
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
        </Container>
      </div>
    </div>
  );
}

export default UploadFilm;
