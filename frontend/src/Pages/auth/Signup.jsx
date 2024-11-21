import { useState } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { toast } from "react-toastify";

const SignUp = () => {
  const { signup } = useAuthStore();

  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Perform signup and handle the response
    const response = await signup(newUser);

    if (!response?.success) {
      toast.error(response?.message || "Signup failed");
    } else {
      toast.success(response.message || "Signup successful");
      navigate("/login");
    }
  };

  return (
    <div className="signup-page">
      <div className="back-button">
        <Link to="/" className="back-link">
          <FaRegArrowAltCircleLeft className="back-icon" /> Back
        </Link>
      </div>
      <div className="signup-container">
        <div className="form-box">
          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-field"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input-field"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              name="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
            />
            <div className="remember-section">
              <label>
                <input type="checkbox" /> Remember password
              </label>
            </div>
            <button className="submit-btn" type="submit">
              Sign Up
            </button>
          </form>
          <div className="login-link">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
