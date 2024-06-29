
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import astronautImage from "../assests/Art.png"; // Replace with your astronaut image
import { useNavigate } from "react-router-dom";

const Login = () => {
  const history = useNavigate();
  const [pasmlval, setPsmlval] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setPsmlval({ ...pasmlval, [e.target.name]: e.target.value });
  };

  const Submithandler = async (e) => {
    e.preventDefault();
    const host = "http://localhost:8080";
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

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="justify-content-center h-100">
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "#17A2B8",
          
          }}
        >
          <div className="text-center">
            <Image
              src={astronautImage}
              roundedCircle
              fluid
              style={{ width: "300px", height: "300px" }}
            />
            <h2 className="text-white">Welcome </h2>
            <p className="text-white">Just a couple of clicks and we start</p>
          </div>
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <Form onSubmit={Submithandler}>
            <h1 className="text-center mb-4">Login</h1>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={pasmlval.email}
                onChange={handlechange}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={pasmlval.password}
                onChange={handlechange}
                placeholder="Enter password"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              block
              style={{ width: "350px" }}
              className="mt-3"
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
