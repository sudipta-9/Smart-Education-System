import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SignUp = () => {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/api/v1/register?uId=66ef907dc73008b1a6ba8149")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => setError("Error:", error))
            .finally(() => setLoading(false), setError(""));
    }, []);

    return (
        <div className="signup-page">
            <div className="back-button">
                <Link to={"/"} className="back-link">
                    <FaRegArrowAltCircleLeft className="back-icon" /> Back
                </Link>
            </div>
            <div className="signup-container">
                <div className="form-box">
                    <form>
                    <input type="text" placeholder="Name" className="input-field" name={data?.data?.name} />
                        <input type="text" placeholder="Username" className="input-field" Username = {data?.data?.username} />
                        <input type="email" placeholder="Email" className="input-field" Email= {data?.data?.email} />
                        <input type="password" placeholder="Password" className="input-field" Password = {data?.data?.password} />
                        <div className="remember-section">
                            <label>
                                <input type="checkbox" /> Remember password
                            </label>
                        </div>
                        <button className="submit-btn">Sign Up</button>
                    </form>
                    <div className="login-link">
                        <p>
                            Already have an account?{" "}
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
