import "./AddUserPage.css";
import UserForm from "../../components/UserForm/UserForm";

function AddUserPage() {
  return (
    <div className="page">
      <h2>Добавить пользователя</h2>
      <UserForm />
    </div>
  );
}

export default AddUserPage;