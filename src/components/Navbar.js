import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  let location = useLocation();
  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const history = useNavigate();
  const logouter = () => {
    localStorage.removeItem("tocken");
    console.log("dekhte hain=", localStorage.getItem("tocken"));
    history("/Login");
  };
  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/Home">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/Home" ? "active" : ""
                  }`}
                  to="/Home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          {!localStorage.getItem("tocken") ? (
            <div>
              <Link className="btn btn-primary mx-1" to="/Login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/Signup" role="button">
                Signup
              </Link>
            </div>
          ) : (
            <button
              type="button"
              onClick={logouter}
              className="btn btn-primary"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
