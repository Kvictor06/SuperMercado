import { useState } from "react"

interface LoginFormProps {
    isLogged: (user : User) => void;
    closeModal: () => void;
    user : User;
}

const LoginForm: React.FC<LoginFormProps> = ({user, closeModal, isLogged}) => {

    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        closeModal();
        handleLogin();
    }

    const handleLogin = async () => {
        if(user.name == username && user.password == password) {
            localStorage.setItem("user", JSON.stringify(user));
            isLogged(user);
        } 
        return false

    }

    return (
        <div className="form-group">
            <label htmlFor="name" className="text-secondary">Nome: </label>
            <input type="text" className="form-control" id="name" placeholder="Coloque seu nome" value={username} onChange={e => setusername(e.target.value)}/>
            <label htmlFor="password" className="text-secondary">Senha: </label>
            <input type="password" className="form-control mb-3" id="password" placeholder="Coloque sua senha" value={password} onChange={e => setPassword(e.target.value)}/>
            <button className="btn btn-outline-dark" onClick={handleSubmit}>Entrar</button>
        </div>
    )
}
export default LoginForm;