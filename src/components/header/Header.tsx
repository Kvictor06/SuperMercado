import { Link } from "react-router-dom";



const Header = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
            <Link to="home" className="navbar-brand">SuperMercardo</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto ">
                    <li className="nav-item">
                        <Link to="debts" className="nav-link text-secondary">Comprovantes</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;