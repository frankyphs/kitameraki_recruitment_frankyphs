import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTasks, editTask } from "../actions/actionCreator";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
  TextField,
} from "@fluentui/react";

const Table = () => {
  const { tasks } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  const [deletingTask, setDeletingTask] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Delete
  const handleDeleteClick = (task) => {
    setDeletingTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = () => {
    if (deletingTask) {
      dispatch(deleteTasks(deletingTask.id));
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingTask(null);
    setIsDeleteModalOpen(false);
  };

  // Edit
  const [editingTask, setEditingTask] = useState(null);
  const handleEditClick = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
    });
    setEditingTask(task); // Set task yang sedang di-edit
    setIsEditModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const handleEditConfirmation = () => {
    dispatch(editTask(editingTask.id, formData)); // Menggunakan editingTask.id sebagai ID
    setIsEditModalOpen(false);
  };

  // Read
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

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
                <td>{task?.title}</td>
                <td>{task?.description}</td>
                <td>
                  <button onClick={() => handleDeleteClick(task)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditClick(task)}>Edit</button>
                </td>
              </tr>
            ))}
            {deletingTask !== null && (
              <Dialog
                hidden={!isDeleteModalOpen}
                dialogContentProps={{
                  type: DialogType.normal,
                  title: `Apakah kamu yakin ingin menghapus ${deletingTask.title}?`,
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

            {editingTask !== null && (
              <Dialog
                hidden={!isEditModalOpen}
                dialogContentProps={{
                  type: DialogType.normal,
                  title: `Edit Task`,
                }}
                modalProps={{
                  isBlocking: true,
                }}
              >
                <div>
                  <TextField
                    label="Title"
                    value={formData.title}
                    onChange={handleChange}
                    name="title"
                  />
                  <TextField
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    name="description"
                    multiline
                    autoAdjustHeight
                  />
                </div>
                <DialogFooter>
                  <PrimaryButton text="Edit" onClick={handleEditConfirmation} />
                  <DefaultButton
                    text="Cancel"
                    onClick={() => setIsEditModalOpen(false)}
                  />
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
