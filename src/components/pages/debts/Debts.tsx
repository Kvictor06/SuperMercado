import { useEffect, useState } from "react";
import { api } from "../../axios/api";


const Debts = () => {

    const [debts, setDebts] = useState<Order[]>([]);
    
    useEffect(() => {

        const dataOrders = async () => {
            const local = localStorage.getItem("user");
            const user: User = JSON.parse(local!);
            const response = await api.get("");
            const data = response.data.record;
            const findOrder = data.orders.find((find: Order) => find.userId === user.id);
            
            setDebts(findOrder)
        }

        dataOrders();
    }, [])
    return (
        <div className="container">
            <h5 className="text-center">Registro de compras</h5>
            {debts.length > 0 ? (
                <div>
                    {debts.map((debt, index) => (
                        <div key={index}>
                            <hr />
                        <h5 className="text-center mt-3">Compra {index + 1}</h5>
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
                                {debt.products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.name}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.price}</td>
                                        <td>{product.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total : {debt.totalAmount}</td>
                                </tr>
                            </tfoot>
                        </table>
                        </div>
                    ))}
                    <div className="table-responsive">
                    </div>
                </div>
            ) : (
                <h4 className="text-center mt-5">Não há registros de compras</h4>
            )}
        </div>
    )
}

export default Debts;