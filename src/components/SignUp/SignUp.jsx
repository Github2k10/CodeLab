import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import "./SignUp.scss";

const baseURL = "https://beneficial-coherent-butterfly.glitch.me/";
// const baseURL = "http://localhost:8000";

const SignUp = () => {
  const [cookies, setCookie] = useCookies(["username"]);
  const navigate = useNavigate();
  document.title = "Register";

  const passwordValidater = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const register = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!passwordValidater(password)) {
      alert(
        "Password must contain at least 8 characters, 1 upp…e, 1 lowercase, 1 number, and 1 special character"
      );

      return;
    }

    axios
      .post(`${baseURL}/user/register`, {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        setCookie("email", email, { path: "/" });
        setCookie("username", res.data.username, { path: "/" });
        setCookie("userId", res.data.userId, { path: "/" });
        setCookie("AuthToken", res.data.AuthToken, {path: "/"})

        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });

    e.target.reset();
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-box">
          <h1>Adventure starts here 🚀</h1>
          <p className="login-p">Make your code sharing easy and fun!</p>

          <div className="example">
            <p>Email: admin@vuexy.com / Pass: admin</p>
          </div>

          <form className="login-form" onSubmit={(e) => register(e)}>
            <label htmlFor="username">
              Username
              <input
                className="input-tag"
                type="text"
                name="username"
                placeholder="Enter your username"
                required
              />
            </label>
            <br />
            <label htmlFor="email">
              Email
              <input
                className="input-tag"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </label>
            <br />
            <label htmlFor="password">
              Password
              <input
                className="input-tag"
                type="password"
                name="password"
                placeholder="•••••"
                required
              />
            </label>
            <br />

            <input className="submit-btn" type="submit" value="Sign Up" />
          </form>

          <p className="span">
            Already have an account? <Link to="/login">Sign in instead</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
