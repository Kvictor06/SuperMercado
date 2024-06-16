import { useEffect, useState } from "react"
import { api } from "../axios/api";
import { v4 as uuidv4 } from 'uuid';

interface CartFormProps {
    closeCart: () => void
}

const CartForm: React.FC<CartFormProps> = ({ closeCart }) => {

    const [cart, setCart] = useState<Cart>();
    const [user, setUser] = useState<User>();
    
    
    useEffect(() => {
        const data = async () => {
            const local = localStorage.getItem("user");
            const localUser : User = JSON.parse(local!);
            if(localUser) {
                const response = await api.get<User>(`/users/${localUser.id}`);
                setUser(response.data);
            }
        }
        data();
    }, [])
    
    useEffect(() => {
        if(user) {
            const data = async () => {
                const dataCart = await api.get<Cart>(`/carts/${user!.cartId}`);
                setCart(dataCart.data);
            }
            data();
        }
    }, [user])

    const handleCart = async () => {
        console.log(user?.id)
        const newOrder : Order = {
            id: uuidv4(),
            
            userId: user!.id,
            products: cart!.products,
            totalAmount: cart!.totalAmount,
        }

        const resetCart : Cart = {
            ...cart!,
            products: [],
            totalAmount: 0
        }

        const addOrder : User = {
            ...user!,
            ordersIds: [...user!.ordersIds, newOrder.id]
        }

        await api.post(`/orders`, newOrder);
        await api.put(`/carts/${cart!.id}`, resetCart);
        await api.put(`/users/${user?.id}`,  addOrder);
        closeCart();

    }

    return (
        <div className="table-responsive">
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Produto</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Descrição</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {cart?.products.map((product, index )=> (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.stock}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-dark" onClick={handleCart}>Finalizar compra</button>
        </div>
    )
}

export default CartForm