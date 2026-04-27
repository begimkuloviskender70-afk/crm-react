import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import UsersPage from "./pages/UsersPage/UsersPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import AddUserPage from "./pages/AddUserPage/AddUserPage";
import EditUserPage from "./pages/EditUserPage/EditUserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/users" />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserProfilePage />} />
        <Route path="add" element={<AddUserPage />} />
        <Route path="edit/:id" element={<EditUserPage />} />
      </Route>
    </Routes>
  );
}

export default App;