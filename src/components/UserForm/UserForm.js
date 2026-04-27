import "./UserForm.css";

function UserForm() {
  return (
    <form className="form">
      <input placeholder="Имя" />
      <input placeholder="Email" />
      <input placeholder="Телефон" />
      <input placeholder="Город" />

      <button type="submit">Сохранить</button>
    </form>
  );
}

export default UserForm;