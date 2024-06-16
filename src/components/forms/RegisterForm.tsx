import { useState } from "react";
import { api } from "../axios/api";
import { v4 as uuidv4 } from "uuid";

interface RegisterFormProps {
  closeModal: () => void;
  update: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ closeModal, update }) => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const user: User = {
      id: uuidv4(),
      name: username,
      email: email,
      password: password,
      ordersIds: [],
      cartId: "",
    };

    const response = await api.get("");
    const data = response.data.record;
    data.users.push(user);

    await api.put("/", data);

    closeModal();
    update();
  };

  return (
    <div className="form-group">
      <label htmlFor="name" className="text-secondary">
        Nome:{" "}
      </label>
      <input
        type="text"
        className="form-control"
        id="name"
        placeholder="Coloque seu nome"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <label htmlFor="name" className="text-secondary">
        Gmail:{" "}
      </label>
      <input
        type="email"
        className="form-control"
        id="email"
        placeholder="Coloque seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password" className="text-secondary">
        Senha:{" "}
      </label>
      <input
        type="password"
        className="form-control mb-3"
        id="password"
        placeholder="Coloque sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-outline-dark" onClick={handleRegister}>
        Registrar
      </button>
    </div>
  );
};
export default RegisterForm;
