import "./EditUserPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserForm from "../../components/UserForm/UserForm";
import { getUserById, updateUser } from "../../services/usersApi";

function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError("");

        const loadedUser = await getUserById(id);
        setUser(loadedUser);
      } catch (err) {
        const message = err.message || "Could not load user";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  async function handleSubmit(updatedUser) {
    try {
      setSubmitting(true);
      setError("");

      await updateUser(id, updatedUser);
      toast.success("User updated");
      navigate(`/users/${id}`);
    } catch (err) {
      const message = err.message || "Could not update user";
      setError(message);
      toast.error(message);
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <div className="page-heading">
        <h2>Edit user {id}</h2>
        <Link className="button-link secondary" to={`/users/${id}`}>
          Back
        </Link>
      </div>

      {loading && <p className="status-message">Loading user...</p>}
      {!loading && error && (
        <p className="status-message error-message">{error}</p>
      )}
      {!loading && user && (
        <UserForm
          initialUser={user}
          submitLabel="Save changes"
          submitting={submitting}
          error={submitting ? "" : error}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default EditUserPage;
