import "./EditUserPage.css";
import { useParams } from "react-router-dom";
import UserForm from "../../components/UserForm/UserForm";

function EditUserPage() {
  const { id } = useParams();

  return (
    <div className="page">
      <h2>Редактировать пользователя {id}</h2>
      <UserForm />
    </div>
  );
}

export default EditUserPage;