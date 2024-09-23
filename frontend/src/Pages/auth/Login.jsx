import { FaRegArrowAltCircleLeft } from "react-icons/fa";  
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login-page">
            <div className="back-button">
                <Link to={"/"} className="back-link"> 
                    <FaRegArrowAltCircleLeft className="back-icon" /> Back
                </Link>
            </div>
            <div className="login-container">
                <div className="form-box">
                    <form>
                        <input type="text" placeholder="Username" className="input-field" />
                        <input type="password" placeholder="Password" className="input-field" />
                        <div className="remember-section">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                        </div>
                        <button className="submit-btn">Login</button>
                    </form>
                    <div className="signup-link">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/sign-up">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
