import { useState, useEffect } from "react";
import {
  TextField,
  PrimaryButton,
  DatePicker,
  SpinButton,
} from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTask, saveTemplate } from "../actions/actionCreator";
import { NavLink } from "react-router-dom";

const AddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leftColumnComponents, rightColumnComponents } = useSelector(
    (state) => state.template
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    dispatch(saveTemplate(leftColumnComponents, rightColumnComponents));
  }, [dispatch, leftColumnComponents, rightColumnComponents]);

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
      <p>Ini isi {JSON.stringify(leftColumnComponents)} </p>
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

        <div className="customize-form-adding">
          {/* Render leftColumnComponents */}
          <div className="left-custom-form">
            {leftColumnComponents &&
              leftColumnComponents.map((component) => (
                <div key={component.id} className="custom-component-form">
                  <h3>{component.name}</h3>
                  {/* Render the actual component element here */}
                  {/* For example, if the component type is "TextField": */}
                  {component.type === "TextField" && (
                    <TextField placeholder="Enter text" />
                  )}
                  {component.type === "SpinButton" && <SpinButton />}
                  {component.type === "DatePicker" && <DatePicker />}
                  {/* For other types, you can add similar conditions */}
                </div>
              ))}
          </div>

          {/* Render rightColumnComponents */}
          <div className="right-custom-form">
            {rightColumnComponents &&
              rightColumnComponents.map((component) => (
                <div key={component.id} className="custom-component-form">
                  <h3>{component.name}</h3>
                  {/* Render the actual component element here */}
                  {/* For example, if the component type is "DatePicker": */}
                  {component.type === "TextField" && (
                    <TextField placeholder="Enter text" />
                  )}
                  {component.type === "SpinButton" && <SpinButton />}
                  {component.type === "DatePicker" && <DatePicker />}
                  {/* For other types, you can add similar conditions */}
                </div>
              ))}
          </div>

          {/* Tambah input kustomisasi form disini */}
        </div>

        <PrimaryButton className="add-form-button" onClick={handleSubmit}>
          Submit
        </PrimaryButton>
      </div>
    </>
  );
};

export default AddForm;
