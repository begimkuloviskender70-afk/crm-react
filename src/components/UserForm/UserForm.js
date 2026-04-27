import "./UserForm.css";
import { useEffect, useState } from "react";

const emptyForm = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  companyName: "",
  city: "",
};

function getInitialValues(user) {
  if (!user) {
    return emptyForm;
  }

  return {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    website: user.website || "",
    companyName: user.company?.name || "",
    city: user.address?.city || "",
  };
}

function UserForm({ initialUser, submitLabel, submitting, error, onSubmit }) {
  const [formData, setFormData] = useState(() => getInitialValues(initialUser));
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setFormData(getInitialValues(initialUser));
  }, [initialUser]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function validateForm() {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) {
      nextErrors.firstName = "Name is required";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email";
    }

    setValidationErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      website: formData.website.trim(),
      company: {
        ...(initialUser?.company || {}),
        name: formData.companyName.trim(),
      },
      address: {
        ...(initialUser?.address || {}),
        city: formData.city.trim(),
      },
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <label>
        <span>First name</span>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="John"
        />
        {validationErrors.firstName && (
          <small>{validationErrors.firstName}</small>
        )}
      </label>

      <label>
        <span>Last name</span>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
        />
      </label>

      <label>
        <span>Username</span>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="johndoe"
        />
      </label>

      <label>
        <span>Email</span>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
        />
        {validationErrors.email && <small>{validationErrors.email}</small>}
      </label>

      <label>
        <span>Phone</span>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 555 123 4567"
        />
      </label>

      <label>
        <span>Website</span>
        <input
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="example.com"
        />
      </label>

      <label>
        <span>Company name</span>
        <input
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company LLC"
        />
      </label>

      <label>
        <span>City</span>
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Bishkek"
        />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default UserForm;
