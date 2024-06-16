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
                const response = await api.get("");
                const data = response.data.record;
                const foundedUser = data.users.find((usee: User) => usee.id === use.id)
                setUser(foundedUser);
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

        const response = await api.get("");
        const data = response.data.record;

        const lessStock: Product = {
            ...product,
            stock: product.stock - 1
        }

        if (lessStock.stock === 0) {
            data.products = data.products.filter((delProduct: Product) => delProduct.id !== product.id);
        } else {
            const findProduct = data.products.findIndex((find: Product) => find.id === product.id);
            data.products[findProduct] = lessStock;
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

            data.carts.push(newCart);
            const findUser = data.users.findIndex((find: User) => find.id === user!.id);
            data.users[findUser] == addCartUser;
            await api.put("", data);
            setUser(addCartUser);
        } else {
            const findCart = data.carts.findIndex((find: Cart) => find.id === user!.cartId);
            const thisCart = data.carts[findCart];

            const addProduct: Cart = {
                ...thisCart,
                products: [...thisCart.products, product],
                totalAmount: thisCart.totalAmount + product.price
            };

            data.carts[findCart] = addProduct

        }
        await api.put("", data);
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