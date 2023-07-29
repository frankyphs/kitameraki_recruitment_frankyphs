import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar-container">
        <h2>My Task Management</h2>
        <NavLink exact activeClassName="active" to="/" className="nav-link">
          My Tasks
        </NavLink>
        <NavLink activeClassName="active" to="/add-task" className="nav-link">
          Add Task
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
