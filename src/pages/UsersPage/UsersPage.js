import "./UsersPage.css";
import { useEffect, useState } from "react";
import UserTable from "../../components/UserTable/UserTable";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://dummyjson.com/users");

        if (!response.ok) {
          throw new Error("Could not load users");
        }

        const data = await response.json();
        setUsers(data.users || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <div className="users-page">
      <div className="page-header">
        <div>
          <h2>Users</h2>
          <p className="page-subtitle">User list loaded from DummyJSON API</p>
        </div>
      </div>

      {loading && <p className="status-message">Loading users...</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {!loading && !error && <UserTable users={users} />}
    </div>
  );
}

export default UsersPage;
