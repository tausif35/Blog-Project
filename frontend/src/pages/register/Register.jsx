import axios from "../../service/api";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { Context } from "../../context/Context";


export default function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(false);
  const { dispatch } = useContext(Context);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios().post("/users/signup", {
        name: username,
        email,
        password,
        gender,
        dateOfBirth
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Date Of Birth</label>
        <input
          type="date"
          className="registerInput"
          placeholder="2000-08-20"
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <label>Gender</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your gender"
          onChange={(e) => setGender(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
    </div>
  );
}
