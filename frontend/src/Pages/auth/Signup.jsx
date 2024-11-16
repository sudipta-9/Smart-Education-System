import { useState } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { toast } from "react-toastify";

const SignUp = () => {
  // const [data, setData] = useState();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  // useEffect(() => {
  //     fetch("http://localhost:4000/api/v1/register?uId=66ef907dc73008b1a6ba8149")
  //         .then((response) => response.json())
  //         .then((data) => setData(data))
  //         .catch((error) => setError("Error:", error))
  //         .finally(() => setLoading(false), setError(""));
  // }, []);

  const { signup } = useAuthStore();

  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const response = signup(newUser);
    if (!response.success) toast.error(response.message);
    else {
      toast.success(response.message);
      navigate("/login");
    }
  };

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
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-field"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
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
            />
            <div className="remember-section">
              <label>
                <input type="checkbox" /> Remember password
              </label>
            </div>
            <button className="submit-btn" onClick={(e) => handleSignup(e)}>
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
