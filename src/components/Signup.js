import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();
  const [pasmlval, setPsmlval] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const Submithandler = async (e) => {
    e.preventDefault();
    console.log(pasmlval.password, pasmlval.cpassword);
    if (pasmlval.password === pasmlval.cpassword) {
      const host = "http://localhost:4000";
      const response = await fetch(`${host}/api/auth/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: pasmlval.name,
          email: pasmlval.email,
          password: pasmlval.password,
        }),
      });
      const jsondata = await response.json();
      if (jsondata.success) {
        localStorage.setItem("tocken", jsondata.jwtdata);
        history("/");
      } else {
        alert("sorry for this credential");
      }
    } else {
      alert("Password does not match");
    }
  };
  const handlechange = (e) => {
    setPsmlval({ ...pasmlval, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1 style={{textAlign:"center", margin:"18px"}}>Sign up</h1>
      <form onSubmit={Submithandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            onChange={handlechange}
            type="text"
            name="name"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={handlechange}
            type="email"
            name="email"
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
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={handlechange}
            type="password"
            name="cpassword"
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

export default Signup;
