import { useEffect, useState } from "react";
import { api } from "../../../axios/api";
import CardProducts from "../../../cards/CardProducts";
import ModalCart from "../../../modals/ModalCart";
import ModalRegisterProduct from "../../../modals/ModalRegisterProduct";


const Catalog = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [user, setUser] = useState<User | null>();
    const [cart, setCart] = useState<Cart>();
    const [showCart, setShowCart] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [updateCont, setUpdateCont] = useState(0);

    const update = () => {
        setUpdateCont(prevCount => prevCount + 1);
    }

    useEffect(() => {
        const dataUser = async () => {
    
            const storage = localStorage.getItem("user");
            const user : User = JSON.parse(storage!);
            if(user) {
                const response = await api.get<User>(`/users/${user.id}`);
                setUser(response.data);
            }
        }
        dataUser();
    }, [])

    useEffect(() => {
        const dataProducts = async () => {
            const response = await api.get<Product[]>('/products');
            const cartFilter = response.data.filter(products => products.stock > 0)
            setProducts(cartFilter);
        }
        dataProducts();
    }, [update])

    useEffect(() => {

        const dataCart = async () => {
            if(user?.cartId) {
                const response = await api.get<Cart>(`/carts/${user!.cartId}`)
                if (response) {
                    setCart(response.data)
                }
            }
        }
        dataCart();
    }, [update])


    const openCart = () => {
        setShowCart(true);
    }
    const openRegister = () => {
        setShowRegister(true);
    }

    const closeCart = () => {
        setShowCart(false);
        setShowRegister(false);
    }

    return (
        <div className="container mt-5">
            {showRegister && <ModalRegisterProduct update={update} closeModal={closeCart} />}
            {showCart && <ModalCart closeCart={closeCart} />}
            <h5 className="text-center">Escolha alguns produtos do nosso catalogo
                <button onClick={openCart} className="btn btn-outline-dark ml-3">
                    &#128722;{cart && cart.products && cart.products.length !== 0 ? ` (${cart.products.length})` : "0"}
                </button>

            </h5>

            <p className="text-center">Se preferir cadastre algum produto <button onClick={openRegister} className="btn btn-secondary">Cadastrar</button></p>
            {products.length !== 0 ? (
                <div>
                    {products.map((product => (
                        <div key={product.id}>
                            {<CardProducts update={update} product={product} />}
                        </div>
                    )))}
                </div>
            ) : (
                <div>
                    <h5 className="text-center">Parece que não produtos Cadastrados</h5>
                </div>
            )}

        </div>
    )
}

export default Catalog;