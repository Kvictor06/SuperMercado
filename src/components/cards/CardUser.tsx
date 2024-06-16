import { useState } from "react";
import UserModal from "../modals/ModalUser";

interface UserCardProps {
    user: User;
    isLogged: () => void;
    selectUser: (user : User) => void
}

const CardUser: React.FC<UserCardProps> = ({ user, isLogged, selectUser}) => {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
        selectUser(user);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div className="card text-white bg-dark mb-3" style={{maxWidth: "22rem"}}>
            <div className="card-header">{user.name}</div>
            <div className="card-body">
                <h5 className="card-title">Email: {user.email}</h5>
                <h5 className="">Pedidos realizados: {user.ordersIds.length}</h5>
                <button className="btn btn-outline-light" onClick={openModal}>Selecionar</button>
                {showModal && <UserModal user={user} closeModal={closeModal} isLogged={isLogged}/>}
            </div>
        </div>
    )
}

export default CardUser