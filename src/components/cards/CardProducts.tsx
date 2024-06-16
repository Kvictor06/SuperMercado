import { useEffect, useState } from "react";
import { api } from "../axios/api";
import ModalEditProduct from "../modals/ModalEditProduct";
import { v4 as uuidv4 } from 'uuid';

interface CardProductsProps {
    product: Product;
    update: () => void;
}


const CardProducts: React.FC<CardProductsProps> = ({ product, update }) => {

    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState<User>();


    useEffect(() => {
        const data = async () => {
            const local = localStorage.getItem("user");
            const use: User = JSON.parse(local!);
            if (use) {
                const response = await api.get<User>(`/users/${use.id}`)
                setUser(response.data);
            }
        }
        data();
    }, [])

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const deleteCard = async () => {
        const response = await api.get("");
        const data = response.data.record;
        data.products = data.products.filter((produc: Product) => produc.id !== product.id);
        await api.put('', data);
        update();
    }

    const selectProduct = async () => {

        const lessStock: Product = {
            ...product,
            stock: product.stock - 1
        }

        if (lessStock.stock === 0) {
            await api.delete(`/products/${product.id}`);
        }

        if (user!.cartId === "") {

            const newCart: Cart = {
                id: uuidv4(),
                userId: user!.id,
                products: [product],
                totalAmount: product.price
            }

            const addCartUser: User = {
                ...user!,
                cartId: newCart.id
            }

            await api.post(`/carts`, newCart);
            await api.put(`/users/${user!.id}`, addCartUser);
            setUser(addCartUser);

        } else {
            const response = await api.get<Cart>(`/carts/${user!.cartId}`);

            const addProduct: Cart = {
                ...response.data,
                products: [...response.data.products, product],
                totalAmount: response.data.totalAmount + product.price
            }

            await api.put(`/carts/${response.data.id}`, addProduct);
            await api.put(`/products/${product.id}`, lessStock);

        }
        update();

    }

    return (
        <div >
            {showModal && (<ModalEditProduct update={update} closeModal={closeModal} product={product} />)}
            <div className="card text-white bg-dark mb-3" style={{ maxWidth: "22rem" }}>
                <div className="card-header text-center">Mercadoria</div>
                <div className="card-body">
                    <h6 className="card-text">Produto: {product.name}</h6>
                    <h6 className="card-text">Quantidade: {product.stock}</h6>
                    <h6 className="card-text">Valor: {product.price}</h6>
                    <button className="btn btn-outline-light mr-2" onClick={selectProduct}>Selecionar</button>
                    <button className="btn btn-outline-light mr-2" onClick={openModal}>Editar</button>
                    <button className="btn btn-outline-danger" onClick={deleteCard}>Excluir</button>
                </div>
            </div>
        </div>
    )
}

export default CardProducts;