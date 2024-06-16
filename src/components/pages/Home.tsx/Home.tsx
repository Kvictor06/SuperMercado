import { useEffect, useState } from "react";
import { api } from "../../axios/api";
import CardUser from "../../cards/CardUser";
import ModalRegister from "../../modals/ModalRegister";
import Catalog from "./catalog/Catalog";



const Home = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>();
    const [localUser, setLocalUser] = useState<User | null>()
    const [showModal, setShowModal] = useState(false);
    const [update, setUpdate] = useState(0);
    
    
    const updateCont = () => {
        setUpdate(prevUpdate => prevUpdate + 1);
    }

    const handleLogout = () => {
        localStorage.removeItem("user");
        setLocalUser(null);
    }

    const deleteAcount = async () => {
        handleLogout();
        const response = await api.get("");
        const data = response.data.record;
        data.users = data.users.filter((use: User) => use.id !== user!.id);
        await api.put('', data);
        setUsers(users.filter(user => user.id !== user!.id));
    }

    useEffect(() => {
        const useData = async () => {
            const response = await api.get("");
            const data = response.data.record.users;
            setUsers(data);
            console.log(users);
        }
        useData();
    }, [update]);


    useEffect(() => {
        const local = localStorage.getItem("user");

        if (local) {
            console.log(local)
            const localUser: User = JSON.parse(local);
            setLocalUser(localUser);
        } else {
        }
    }, [])

    const handleLogged = () => {
        setLocalUser(user)
    }

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const selectUser = async (user: User) => {
        const responseApi = await api.get('');
        const data = responseApi.data.record.users;
        const foundedUser = data.find((use: User) => use.id === user.id)
        setUser(foundedUser)

    }



    return (
        <div className="m-3">
            {localUser ? (
                <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-secondary mr-3" onClick={deleteAcount}>Deleta Conta</button>
                    <button className="btn btn-outline-secondary" onClick={handleLogout}>Deslogar</button>
                </div>
            ) : ("")}

            <div className="home container">
                {localUser ? (
                    <div>
                        <Catalog />
                    </div>
                ) : (
                    <div>
                        {showModal && <ModalRegister update={updateCont} closeModal={closeModal} />}

                        <h3 className="text-center mt-5">Bem vindo ao superMercado</h3>
                        <p className="text-center">Selecione um usuario para vê nosso catalogo de compras</p>
                        <p className="text-center">Não tem uma conta? <button className="btn btn-secondary" onClick={openModal}>Cadastre-se</button></p>

                        {users.length !== 0 ? (
                            <div className="d-flex">
                                {users.map((user => (
                                    <div className="m-3" key={user.id}>
                                        <CardUser key={user.id} user={user} isLogged={handleLogged} selectUser={selectUser} />
                                    </div>
                                )))}
                            </div>
                        ) : (
                            <div>
                                <p className="text-center">Não há usuarios cadastrados</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;