
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import astronautImage from "../assests/Art.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const history = useNavigate();

  const [pasmlval, setPsmlval] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setPsmlval({ ...pasmlval, [e.target.name]: e.target.value });
  };

  const Submithandler = async (e) => {
    e.preventDefault();
    console.log(pasmlval.password, pasmlval.cpassword);
    if (pasmlval.password === pasmlval.cpassword) {
      const host = "http://localhost:8080";
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

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="justify-content-center h-100">
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#17A2B8" }}
        >
          <div className="text-center">
            <Image
              src={astronautImage}
              roundedCircle
              fluid
              style={{ width: "300px", height: "300px" }}
            />
            <h2 className="text-white">Welcome my friend</h2>
            <p className="text-white">Just a couple of clicks and we start</p>
          </div>
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <Form onSubmit={Submithandler}>
            <h2 className="text-center">Register</h2>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={pasmlval.name}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={pasmlval.email}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={pasmlval.password}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="cpassword"
                value={pasmlval.cpassword}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
            </Form.Group>
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                block
                style={{ width: "350px", marginTop: "20px" }}
              >
                Register
              </Button>
              <p className="mt-3 text-center">
                Already have an account?{" "}
                <Button variant="link" href="/login">
                  Login
                </Button>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
