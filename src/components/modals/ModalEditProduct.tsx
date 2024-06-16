import EditProductForm from "../forms/EditProductForm";

interface ModalEditProduct {
    update: () => void;
    closeModal: () => void;
    product: Product;
}

const ModalEditProduct: React.FC<ModalEditProduct> = ({ product, closeModal, update }) => {

    return (
        <div className="modal-backdrop-blur">
            <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-secondary">Editar Produto</h5>
                            <button type="button" className="close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <EditProductForm update={update} closeModal={closeModal} product={product} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-white" onClick={closeModal}>Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditProduct;