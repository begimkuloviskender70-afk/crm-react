import "./AddUserPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserForm from "../../components/UserForm/UserForm";
import { addUser } from "../../services/usersApi";

function AddUserPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(user) {
    try {
      setSubmitting(true);
      setError("");
      await addUser(user);
      // Redirect after save.
      navigate("/users");
    } catch (err) {
      setError(err.message || "Could not add user");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <div className="page-heading">
        <h2>Add user</h2>
        <Link className="button-link secondary" to="/users">
          Back
        </Link>
      </div>

      <UserForm
        submitLabel="Add user"
        submitting={submitting}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddUserPage;
