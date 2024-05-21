import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const history = useNavigate();
  const [pasmlval, setPsmlval] = useState({
    email: "",
    password: "",
  });
  const Submithandler = async (e) => {
    e.preventDefault();
    const host = "http://localhost:4000";
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: pasmlval.email,
        password: pasmlval.password,
      }),
    });
    const jsondata = await response.json();

    if (jsondata.success) {
      localStorage.setItem("tocken", jsondata.jwtdata);
      console.log("login tocken", jsondata.jwtdata);
      history("/");
    } else {
      alert("kindly use correct credential");
    }
  };
  const handlechange = (e) => {
    setPsmlval({ ...pasmlval, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1 style={{textAlign:"center", margin:"18px"}}>Login</h1>
      <form onSubmit={Submithandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={handlechange}
            type="email"
            name="email"
            value={pasmlval.email}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={handlechange}
            value={pasmlval.password}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
