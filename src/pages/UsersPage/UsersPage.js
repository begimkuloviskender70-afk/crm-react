import "./UsersPage.css";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserTable from "../../components/UserTable/UserTable";
import { deleteUser, getUsers } from "../../services/usersApi";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");

  const ageRanges = [
    { value: "", label: "All ages" },
    { value: "18-29", label: "18-29" },
    { value: "30-39", label: "30-39" },
    { value: "40-49", label: "40-49" },
    { value: "50+", label: "50+" },
  ];

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError("");

        const loadedUsers = await getUsers();
        setUsers(loadedUsers);
      } catch (err) {
        const message = err.message || "Something went wrong";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim().toLowerCase());
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const cityOptions = useMemo(() => {
    const cities = users
      .map((user) => user.address?.city)
      .filter(Boolean)
      .sort((firstCity, secondCity) => firstCity.localeCompare(secondCity));

    return [...new Set(cities)];
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
      const email = (user.email || "").toLowerCase();
      const city = user.address?.city || "";

      const matchesSearch =
        !debouncedSearchQuery ||
        fullName.includes(debouncedSearchQuery) ||
        email.includes(debouncedSearchQuery);
      const matchesCity = !cityFilter || city === cityFilter;
      const matchesAge =
        !ageFilter ||
        (ageFilter === "18-29" && user.age >= 18 && user.age <= 29) ||
        (ageFilter === "30-39" && user.age >= 30 && user.age <= 39) ||
        (ageFilter === "40-49" && user.age >= 40 && user.age <= 49) ||
        (ageFilter === "50+" && user.age >= 50);

      return matchesSearch && matchesCity && matchesAge;
    });
  }, [users, debouncedSearchQuery, cityFilter, ageFilter]);

  const hasActiveFilters = searchQuery || cityFilter || ageFilter;

  function resetFilters() {
    setSearchQuery("");
    setCityFilter("");
    setAgeFilter("");
  }

  async function handleDeleteUser(userId) {
    const shouldDelete = window.confirm("Delete this user?");

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteUser(userId);
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== userId)
      );
      toast.success("User deleted");
    } catch (err) {
      toast.error(err.message || "Could not delete user");
    }
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <div>
          <h2>Users</h2>
          <p className="page-subtitle">User list loaded from DummyJSON API</p>
        </div>

        <Link className="button-link" to="/add">
          Add user
        </Link>
      </div>

      {loading && <p className="status-message">Loading users...</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {!loading && !error && (
        <>
          <div className="users-toolbar">
            <label className="search-field">
              <span>Search by name or email</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Enter name or email"
              />
            </label>

            <label className="filter-field">
              <span>Age</span>
              <select
                value={ageFilter}
                onChange={(event) => setAgeFilter(event.target.value)}
              >
                {ageRanges.map((range) => (
                  <option key={range.value || "all"} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="filter-field">
              <span>City</span>
              <select
                value={cityFilter}
                onChange={(event) => setCityFilter(event.target.value)}
              >
                <option value="">All cities</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            <button
              className="reset-filters-button"
              type="button"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
            >
              Reset
            </button>
          </div>

          <div className="users-results-summary">
            Showing {filteredUsers.length} of {users.length} users
          </div>

          <UserTable users={filteredUsers} onDeleteUser={handleDeleteUser} />
        </>
      )}
    </div>
  );
}

export default UsersPage;
