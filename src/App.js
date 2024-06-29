import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/NoteContext/noteconState";
import Login from "./components/Login";
import Signup from "./components/Signup";
export default class App extends Component {
  render() {
    return (
      <>
        <NoteState>
          <Router>
            <Navbar />
            <div >
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Home" element={<Home />} />
                <Route exact path="/About" element={<About />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/Signup" element={<Signup />} />
              </Routes>
            </div>
          </Router>
        </NoteState>
      </>
    );
  }
}
