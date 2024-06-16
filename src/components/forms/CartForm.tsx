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
                const response = await api.get("");
                const data = response.data.record;
                const foundedUser = data.users.find((find: User) => find.id === localUser.id)
                setUser(foundedUser);
            }
        }
        data();
    }, [])
    
    useEffect(() => {
        if(user) {
            const data = async () => {
                const response = await api.get("");
                const data = response.data.record;
                const foundedCart = data.carts.find((find: Cart) => find.id === user!.cartId);
                setCart(foundedCart);
            }
            data();
        }
    }, [user])

    const handleCart = async () => {

        const response = await api.get("");
        const data = response.data.record;

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

        data.orders.push(newOrder);
        const findCart = data.carts.findIndex((find: Cart) => find.id === cart!.id);
        data.carts[findCart] = resetCart;
        const findUser = data.users.findIndex((find: User) => find.id === user!.id);
        data.users[findUser] = addOrder;
        
        await api.put("", data);
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