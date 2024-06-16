import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { api } from "../axios/api";

interface ProductFormProps {
    closeModal: () => void;
    update: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ closeModal, update }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState('');

    const handleRegister = async () => {

        const newProduct : Product = {
            id: uuidv4(),
            name: name,
            description: description,
            price: price,
            stock: stock
        }
        
        const response = await api.get('');
        const data = response.data.record.products;
        data.push(newProduct);
        await api.put('/', data);
        closeModal();
        update();
    }

    return (

        <div className="form-group">
            <label htmlFor="name" className="text-secondary">NomeA: </label>
            <input type="text" className="form-control" id="name" placeholder="Coloque seu nome" value={name} onChange={e => setName(e.target.value)} />
            <label htmlFor="description" className="text-secondary">Descrição:</label>
            <input type="text" className="form-control" id="description" placeholder="Ex: Pão amanhecido" value={description} onChange={e => setDescription(e.target.value)} />
            <label htmlFor="value" className="text-secondary">Preço: </label>
            <input type="number" className="form-control" id="price" placeholder="ex: 1000" value={price} onChange={e => setPrice(Number(e.target.value))} />
            <label htmlFor="value" className="text-secondary">Estoque: </label>
            <input type="number" className="form-control mb-5" id="price" placeholder="ex: 1000" value={stock} onChange={e => setStock(Number(e.target.value))} />
            <button className="btn btn-outline-dark" onClick={handleRegister}>Registrar</button>
        </div>

    )
}
export default ProductForm;