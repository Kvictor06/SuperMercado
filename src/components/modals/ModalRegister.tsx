import RegisterForm from "../forms/RegisterForm";

interface ModalRegisterProps {
    closeModal: () => void;
    update: () => void;
}

const ModalRegister: React.FC<ModalRegisterProps> = ({ closeModal, update }) => {
    return (
        <div className="modal-backdrop-blur">
            <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-secondary">Registro de usuario</h5>
                            <button type="button" className="close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <RegisterForm update={update} closeModal={closeModal} />
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
export default ModalRegister;