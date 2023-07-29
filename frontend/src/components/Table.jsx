import { useState } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
} from "@fluentui/react";

const Table = () => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Belajar Javascript",
      description:
        "Mengerjakan tugad Back-End dengan Node JS, PostgreSQL dan ExpressJs, Mengerjakan tugad Back-End dengan Node JS, PostgreSQL dan ExpressJs",
    },
    {
      id: 2,
      title: "Belajar Javascript",
      description: "Mengerjakan tugad Front-End dengan VueJS",
    },
    {
      id: 3,
      title: "Belajar Javascript",
      description: "Mengerjakan tugad Front-End dengan  ReactJS",
    },
    {
      id: 4,
      title: "Belajar Deploy",
      description: "Deploy tugas server ke AWS EC2 dengan docker",
    },
  ]);

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
  };

  const handleSaveClick = () => {
    setEditingTaskId(null);
  };

  const handleDescriptionChange = (event, newValue) => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, description: newValue } : task
    );
    setTasks(updatedTasks);
  };

  function handleDeleteClick(task) {
    setDeletingTaskId(task.id);
  }
  function handleDeleteConfirmation() {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== deletingTaskId)
    );
    setDeletingTaskId(null); // Tutup modal setelah menghapus tugas
  }
  function handleDeleteCancel() {
    setDeletingTaskId(null);
  }

  return (
    <>
      <h1>List of My Tasks</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>
                  {editingTaskId === task.id ? (
                    <TextField
                      defaultValue={task.description}
                      onBlur={handleSaveClick}
                      onChange={handleDescriptionChange}
                    />
                  ) : (
                    task.description
                  )}
                </td>
                <td>
                  <button onClick={() => handleDeleteClick(task)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditClick(task)}>Edit</button>
                </td>
              </tr>
            ))}
            {deletingTaskId !== null && (
              <Dialog
                hidden={false}
                dialogContentProps={{
                  type: DialogType.normal,
                  title: `Apakah kamu yakin ingin menghapus ${
                    tasks.find((task) => task.id === deletingTaskId).title
                  }?`,
                }}
                modalProps={{
                  isBlocking: true,
                }}
              >
                <DialogFooter>
                  <PrimaryButton
                    text="Yes"
                    onClick={handleDeleteConfirmation}
                  />
                  <DefaultButton text="No" onClick={handleDeleteCancel} />
                </DialogFooter>
              </Dialog>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
