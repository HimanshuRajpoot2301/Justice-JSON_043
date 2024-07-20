import React, { useState } from "react";
import { register } from "../../api/auth";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    try {
      const response = await register(userData);
      console.log(response);
      // Handle registration success (e.g., save token, redirect)
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleSwitch = () => {
    navigate("/login");
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //     placeholder="Name"
    //   />
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
    //   <button type="submit">Register</button>
    // </form>
    <div>
      <div>
        <div class="container">
          <div class="forms-container">
            <div class="signin-signup">
              <form action="" class="sign-in-form" onSubmit={handleSubmit}>
                <h2 class="title">Sign Up</h2>
                <div class="input-field">
                  <i class="fas fa-user"></i>
                  {/* <input type="email" placeholder="Email" /> */}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
                <div class="input-field">
                  <i class="fas fa-user"></i>
                  {/* <input type="email" placeholder="Email" /> */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div class="input-field">
                  <i class="fas fa-lock"></i>
                  {/* <input type="password" placeholder="Password" /> */}
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <input type="submit" value="Signup" class="btn solid" />
              </form>
            </div>
          </div>
          <div class="panels-container">
            <div class="panel left-panel">
              <div class="content">
                <h3>One of us?</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                  minus natus est.
                </p>
                <button
                  class="btn transparent"
                  id="sign-in-btn"
                  onClick={handleSwitch}
                >
                  Sign In
                </button>
              </div>
              <img src="./img/log.svg" class="image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
