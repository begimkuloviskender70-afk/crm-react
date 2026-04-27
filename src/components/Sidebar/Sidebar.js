import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h1>Mini CRM</h1>

      <nav>
        <NavLink to="/users">Пользователи</NavLink>
        <NavLink to="/add">Добавить</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;