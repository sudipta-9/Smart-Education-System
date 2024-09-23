import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaUser } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo" height={40} width={40} />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/about">
                                    About Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/job-section">
                                    Job Section
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/resume-build">
                                    Resume Build
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/course">
                                    Course
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/feedback">
                                    Feedback
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex">
                        <Link to="/login">
                            <button className="btn btn-outline-primary me-2 btn-sm">Login</button>
                        </Link>
                        <Link to="/sign-up">
                            <button className="btn btn-primary btn-sm me-2">Sign Up</button>
                        </Link>
                        <div className="dropdown">
                            <button className="btn btn-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                User
                                <FaUser />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end my-3">
                                <li>
                                    <a className="dropdown-item my-2" href="/profile">
                                    <FaUserAlt className="me-2" />
                                    Profile
                                    </a>
                                </li>
                                <li>
                                    <center>
                                        <a className="dropdown-item" href="/home">
                                            <button type="button" className="btn btn-outline-danger">Logout</button>
                                        </a>
                                    </center>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
