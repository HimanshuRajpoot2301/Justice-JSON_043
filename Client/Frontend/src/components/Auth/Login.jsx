import React, { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      const response = await login(userData);
      console.log(response);
      // Handle login success (e.g., save token, redirect)
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSwitch = () => {
    navigate("/register");
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     placeholder="Email"
    //   />
    //   <input
    //     type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     placeholder="Password"
    //   />
    //   <button type="submit">Login</button>
    // </form>
    <div>
      <div class="container">
        <div class="forms-container">
          <div class="signin-signup">
            <form action="" class="sign-in-form" onSubmit={handleSubmit}>
              <h2 class="title">Sign In</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <input type="submit" value="Login" class="btn solid" />
            </form>
          </div>
        </div>
        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>New here?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                minus natus est.
              </p>
              <button
                class="btn transparent"
                id="sign-up-btn"
                onClick={handleSwitch}
              >
                Sign Up
              </button>
            </div>
            <img
              src="Justice-JSON_043/Client/Frontend/src/assets/log.svg"
              class="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
