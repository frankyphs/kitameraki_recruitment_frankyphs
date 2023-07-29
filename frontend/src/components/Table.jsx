import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTasks } from "../actions/actionCreator";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
} from "@fluentui/react";

const Table = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [deletingTask, setDeletingTask] = useState(null); // Ganti deletingTaskId dengan deletingTask
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = (task) => {
    setDeletingTask(task); // Simpan data tugas yang akan dihapus dalam state local
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
                  <button>Edit</button>
                </td>
              </tr>
            ))}
            {deletingTask !== null && ( // Ganti deletingTaskId dengan deletingTask
              <Dialog
                hidden={!isDeleteModalOpen}
                dialogContentProps={{
                  type: DialogType.normal,
                  title: `Apakah kamu yakin ingin menghapus ${deletingTask.title}?`, // Gunakan deletingTask.title untuk menampilkan judul tugas yang akan dihapus
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
