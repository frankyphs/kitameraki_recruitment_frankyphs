import { useState } from "react";
import { TextField, PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "../actions/actionCreator";
import { NavLink } from "react-router-dom";

const AddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState({
    show: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.trim() === "" || formData.description.trim() === "") {
      setError({ show: true, message: "Please fill all the field" });
    } else {
      dispatch(addTask(formData));
      navigate("/");
    }
  };

  return (
    <>
      <h1>Add Form</h1>
      {error.show && (
        <div style={{ fontSize: "22px", color: "red", marginLeft: "14px" }}>
          {error.message}
        </div>
      )}
      <div className="add-form-container">
        <NavLink to="/customize-form" style={{ fontSize: "24px" }}>
          Customize the form
        </NavLink>
        <h3>Input Task`s Name</h3>
        <TextField
          value={formData.title}
          onChange={handleChange}
          className="add-form-input"
          name="title"
        />

        <h3>Input Task`s Description</h3>
        <TextField
          value={formData.description}
          multiline
          autoAdjustHeight
          onChange={handleChange}
          className="add-form-input"
          name="description"
        />

        {/* Tambah input kustomisasi form disini */}

        {/* Tambah input kustomisasi form disini */}

        <PrimaryButton className="add-form-button" onClick={handleSubmit}>
          Submit
        </PrimaryButton>
      </div>
    </>
  );
};

export default AddForm;
