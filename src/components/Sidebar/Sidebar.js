import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h1>Mini CRM</h1>

      <nav>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/add">Add user</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
