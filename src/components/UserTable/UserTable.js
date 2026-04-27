import "./UserTable.css";
import { Link } from "react-router-dom";

function UserTable() {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Email</th>
          <th>Город</th>
          <th>Действия</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td>Искендер</td>
          <td>example@mail.com</td>
          <td>Бишкек</td>
          <td className="table-actions">
            <Link to="/users/1">Профиль</Link>
            <Link to="/edit/1">Редактировать</Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default UserTable;