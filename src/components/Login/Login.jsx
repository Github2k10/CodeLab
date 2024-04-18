import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import "./Login.scss";

const baseURL = "https://code-lab-backend-one.vercel.app";
// const baseURL = "http://localhost:8000";

const Login = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  document.title = "Login";

  const login = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    axios
      .post(
        `${baseURL}/user/login`,
        {
          email: email,
          password: password,
        },
      )
      .then((res) => {
        console.log(res);
        setCookie("email", email, { path: "/" });
        setCookie("username", res.data.username, { path: "/" });
        setCookie("userId", res.data.userId, { path: "/" });
        setCookie("AuthToken", res.data.AuthToken, {path: "/"})

        navigate("/");
      })
      .catch((err) => {
        console.log(err)
        if (err.request.status == 400) {
          alert("Email or Passwrod Missing.");
        }

        if (err.request.status == 401) {
          alert("Authentication failed: Wrong Email or Password.");
        }

        if (err.request.status == 500) {
          alert("Ops!!! Server Error.");
        }
      });

    e.target.reset();
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-box">
          <h1>Welcome to CodeLab! 👋🏻</h1>
          <p className="login-p">
            Please sign-in to your account and start the adventure
          </p>

          <div className="example">
            <p>Email: admin@vuexy.com / Pass: admin</p>
          </div>

          <form className="login-form" onSubmit={(e) => login(e)}>
            <label htmlFor="email">
              Email
              <input
                className="input-tag"
                type="email"
                name="email"
                placeholder="admin@codelab.com"
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
            <div className="check-box">
              <div>
                <input type="checkbox" />
                <span>Remember me</span>
              </div>
              <Link>Forget Password?</Link>
            </div>
            <input className="submit-btn" type="submit" value="Login" />
          </form>

          <p className="span">
            New on our platform? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
