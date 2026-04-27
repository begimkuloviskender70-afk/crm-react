const API_URL = "https://dummyjson.com/users";
const STORAGE_KEY = "mini-crm-users";

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getSavedUsers() {
  try {
    const savedUsers = localStorage.getItem(STORAGE_KEY);

    if (!savedUsers) {
      return null;
    }

    const users = JSON.parse(savedUsers);

    if (!Array.isArray(users)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return users;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function makeUser(user, id) {
  return {
    id,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    website: user.website || "",
    age: user.age || "",
    image: user.image || "https://dummyjson.com/icon/user/128",
    company: {
      name: user.company?.name || "",
    },
    address: {
      city: user.address?.city || "",
      address: user.address?.address || "",
    },
  };
}

export async function getUsers() {
  const savedUsers = getSavedUsers();

  if (savedUsers) {
    return savedUsers;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  saveUsers(data.users);
  return data.users;
}

export async function getUserById(id) {
  const users = await getUsers();
  const user = users.find((item) => String(item.id) === String(id));

  if (!user) {
    throw new Error("Failed to fetch user");
  }

  return user;
}

export async function addUser(user) {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to add user");
  }

  const users = await getUsers();
  const maxId = users.length
    ? Math.max(...users.map((item) => Number(item.id)))
    : 0;
  const newUser = makeUser(user, maxId + 1);
  const updatedUsers = [newUser, ...users];

  saveUsers(updatedUsers);
  return newUser;
}

export async function updateUser(id, user) {
  const users = await getUsers();
  const oldUser = users.find((item) => String(item.id) === String(id));

  if (!oldUser) {
    throw new Error("Failed to update user");
  }

  if (Number(id) <= 30) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  }

  const updatedUser = makeUser(
    {
      ...oldUser,
      ...user,
      company: {
        ...oldUser.company,
        ...user.company,
      },
      address: {
        ...oldUser.address,
        ...user.address,
      },
      image: oldUser.image,
      age: oldUser.age,
    },
    oldUser.id
  );

  const updatedUsers = users.map((item) =>
    String(item.id) === String(id) ? updatedUser : item
  );

  saveUsers(updatedUsers);
  return updatedUser;
}

export async function deleteUser(id) {
  if (Number(id) <= 30) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
  }

  const users = await getUsers();
  const updatedUsers = users.filter((user) => String(user.id) !== String(id));

  saveUsers(updatedUsers);
  return { id, isDeleted: true };
}
