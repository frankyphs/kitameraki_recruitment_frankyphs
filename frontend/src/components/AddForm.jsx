import { useState } from "react";
import { TextField, PrimaryButton } from "@fluentui/react";

const AddForm = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleTaskNameChange = (event, newValue) => {
    setTaskName(newValue);
  };

  const handleTaskDescriptionChange = (event, newValue) => {
    setTaskDescription(newValue);
  };

  const handleSubmit = () => {
    // Lakukan apa yang diperlukan ketika form disubmit
    // Misalnya, tambahkan tugas ke daftar tugas, atau kirim data ke server, dll.
    console.log("Task Name:", taskName);
    console.log("Task Description:", taskDescription);
  };

  return (
    <>
      <h1>Add Form</h1>
      <div className="add-form-container">
        <h3>Input Task`s Name</h3>
        <TextField
          value={taskName}
          onChange={handleTaskNameChange}
          className="add-form-input"
        />

        <h3>Input Task`s Description</h3>
        <TextField
          value={taskDescription}
          multiline
          autoAdjustHeight
          onChange={handleTaskDescriptionChange}
          className="add-form-input"
        />
        <PrimaryButton className="add-form-button" onClick={handleSubmit}>
          Submit
        </PrimaryButton>
      </div>
    </>
  );
};

export default AddForm;
