import { useState } from "react";
import { api } from "../axios/api";

interface EditProductFormProps {
    product: Product;
    closeModal: () => void;
    update: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, closeModal, update }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);

    const handleSubmit = () => {
        closeModal();
        editProduct();    
    }

    const editProduct = async () => {

        const newProduct : Product = {

            ...product,
            name: name,
            price: price,
            description: description,
            stock: stock
        }

        await api.put(`/products/${product.id}`, newProduct);
        update();
    }


    return (
        <div>
            <label htmlFor="name" className="text-secondary">Nome do Produto: </label>
            <input type="text" className="form-control" id="name" placeholder="Ex: Pão" value={name} onChange={e => setName(e.target.value)} />
            <label htmlFor="description" className="text-secondary mt-3">Descrição: </label>
            <input type="text" className="form-control" id="description" placeholder="Ex: Pão amanhecido" value={description} onChange={e => setDescription(e.target.value)} />
            <label htmlFor="price" className="text-secondary mt-3">Preço: </label>
            <input type="number" className="form-control" id="price" placeholder="Ex: 10" value={price} onChange={e => setPrice(Number(e.target.value))} />
            <label htmlFor="stock" className="text-secondary mt-3">Estoque: </label>
            <input type="number" className="form-control" id="stock" placeholder="Ex: 3" value={stock} onChange={e => setStock(Number(e.target.value))} />
            <button className="btn btn-outline-dark mt-5" onClick={handleSubmit}>Editar</button>
        </div>
    )
}

export default EditProductForm;