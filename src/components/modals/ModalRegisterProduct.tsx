import ProductForm from "../forms/ProductForm";

interface ModalRegisterProductProps {
    closeModal: () => void;
    update: () => void;
}

const ModalRegisterProduct: React.FC<ModalRegisterProductProps> = ({closeModal, update}) => {
    return (
        <div>
            <div className="modal-backdrop-blur">
            <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-secondary">Registro de Produto</h5>
                            <button type="button" className="close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ProductForm closeModal={closeModal} update={update}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-white" onClick={closeModal}>Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ModalRegisterProduct;