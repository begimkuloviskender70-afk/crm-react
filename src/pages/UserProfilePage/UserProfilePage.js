import "./UserProfilePage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteUser, getUserById } from "../../services/usersApi";

function UserProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

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

  async function handleDelete() {
    const shouldDelete = window.confirm("Delete this user?");

    if (!shouldDelete) {
      return;
    }

    try {
      setDeleting(true);
      await deleteUser(id);
      toast.success("User deleted");
      navigate("/users");
    } catch (err) {
      const message = err.message || "Could not delete user";
      setError(message);
      toast.error(message);
      setDeleting(false);
    }
  }

  return (
    <section className="profile-page">
      <div className="page-header">
        <div>
          <h2>User profile #{id}</h2>
          <p className="page-subtitle">Full user details from DummyJSON API</p>
        </div>

        <Link className="button-link secondary" to="/users">
          Back
        </Link>
      </div>

      {loading && <p className="status-message">Loading user...</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {!loading && !error && user && (
        <>
          <div className="profile-card">
            <div className="profile-photo-card">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
              />
            </div>

            <div>
              <span>Name</span>
              <strong>
                {user.firstName} {user.lastName}
              </strong>
            </div>
            <div>
              <span>Username</span>
              <strong>{user.username}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>
            <div>
              <span>Phone</span>
              <strong>{user.phone}</strong>
            </div>
            <div>
              <span>Age</span>
              <strong>{user.age}</strong>
            </div>
            <div>
              <span>City</span>
              <strong>{user.address?.city || "-"}</strong>
            </div>
            <div>
              <span>Address</span>
              <strong>{user.address?.address || "-"}</strong>
            </div>
            <div>
              <span>Company</span>
              <strong>{user.company?.name || "-"}</strong>
            </div>
            <div>
              <span>Website</span>
              <strong>{user.website || "-"}</strong>
            </div>
          </div>

          <div className="profile-actions">
            <Link className="button-link" to={`/edit/${id}`}>
              Edit
            </Link>
            <button type="button" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default UserProfilePage;
