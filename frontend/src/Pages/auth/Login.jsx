import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuthStore();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const response = login(credentials);
    if (!response.success) toast.error(response.message);
    else {
      toast.success(response.message);
      navigate("/");
    }
  };

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
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input-field"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              name="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            <div className="remember-section">
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>
            <button className="submit-btn" onClick={(e) => handleLogin(e)}>
              Login
            </button>
          </form>
          <div className="signup-link">
            <p>
              Dont have an account? <Link to="/sign-up">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
