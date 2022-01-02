import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initialState);
  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target.value;
    setUser({ ...user, [name]:value, err: "", success: "" });
  };

  return (
    <div className="login_page">
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            id="email"
            value={this.user.email}
            name="email"
            onchange={(e) => handleChangeInput(e)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter password"
            //onchange={handleChangeInput}
          />
        </div>

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/forget_password">Forget Password</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;