import "./UserTable.css";
import { Link } from "react-router-dom";

function UserTable({ users, onDeleteUser }) {
  if (users.length === 0) {
    return <p className="empty-message">No users found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>City</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.address?.city}</td>
              <td>{user.phone}</td>
              <td>{user.company?.name}</td>
              <td>
                <div className="table-actions">
                  <Link to={`/users/${user.id}`}>View</Link>
                  <Link to={`/edit/${user.id}`}>Edit</Link>
                  <button type="button" onClick={() => onDeleteUser(user.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
