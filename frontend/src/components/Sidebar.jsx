import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar-container">
        <h2>My Task Management</h2>
        <NavLink to="/" className="nav-link">
          My Tasks
        </NavLink>
        <NavLink to="/add-task" className="nav-link">
          Add Task
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
