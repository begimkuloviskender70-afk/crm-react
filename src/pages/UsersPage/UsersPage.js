import "./UsersPage.css";
import UserTable from "../../components/UserTable/UserTable";

function UsersPage() {
  return (
    <div>
      <h2>Список пользователей</h2>
      <input className="search" placeholder="Поиск..." />
      <UserTable />
    </div>
  );
}

export default UsersPage;