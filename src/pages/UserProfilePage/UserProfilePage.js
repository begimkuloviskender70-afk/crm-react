import "./UserProfilePage.css";
import { Link, useParams } from "react-router-dom";

function UserProfilePage() {
  const { id } = useParams();

  return (
    <section>
      <h2>Профиль пользователя #{id}</h2>

      <div className="card">
        <p>
          <b>Имя:</b> Искендер Бегимкулов 
        </p>
        <p>
          <b>Email:</b> example@mail.com
        </p>
        <p>
          <b>Телефон:</b> +996 555 123 456
        </p>
        <p>
          <b>Город:</b> Бишкек
        </p>
      </div>

      <Link className="button-link" to={`/edit/${id}`}>
        Редактировать
      </Link>
    </section>
  );
}

export default UserProfilePage;