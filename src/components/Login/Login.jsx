import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import { login } from "../../services/authservices.js";

export const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    login(username, password).then((user) => {
      if (user.id && user.token) {;
        localStorage.setItem(
          "art_user",
          JSON.stringify({
            id: user.id,
            token: user.token,
          })
        );
        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };
  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1 className="text-black">Muse</h1>
          <div>fine art marketplace</div>
          <h2 className="text-black">Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="username"
                value={username}
                onChange={(evt) => setUserName(evt.target.value)}
                className="form-control"
                placeholder="Username"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="form-control"
                placeholder="Password"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button
                className="login-btn btn-info text-dark text-center"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link className="text-center" to="/register">
          Not a member yet?
        </Link>
      </section>
    </main>
  );
};