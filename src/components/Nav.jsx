import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";

export default function Nav() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={"navbar custom-navbar rounded-0"}>
      <div className="col-1 ps-4 p-4 text-start nav-hover">
        <Link to="/" className="text-light">
          <span className="icon-container">
            <FontAwesomeIcon
              icon={faBook}
              size="2xl"
              className="navbar-hover-color icon add-shadow"
            />
          </span>
        </Link>
      </div>
      {user ? (
        <div className="col-11 text-center">
          <div className="d-flex justify-content-end">
            <Link
              className="nav-item nav-link text-light p-3 pe-4 text-decoration-none nav-hover"
              to="/"
              onClick={handleLogout}
            >
              <strong className="navbar-hover-color add-shadow">Logout</strong>
            </Link>
            <div className="dropdown d-flex pe-2">
              <button
                className="btn button_color_1 dropdown-toggle align-items-right ms-3 me-3"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Explore
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
                style={{ width: "250px" }}
              >
                <Link
                  className="nav-item nav-link text-light p-3"
                  to="/book-list"
                >
                  <strong className="large-text dropdown-text">
                    My Reading List
                  </strong>
                </Link>
                <Link className="nav-item nav-link text-light p-3" to="/search">
                  <strong className="large-text dropdown-text">
                    Find New Books
                  </strong>
                </Link>
                <Link
                  className="nav-item nav-link text-light p-3"
                  to="/hardcover-fiction-recommendations"
                >
                  <strong className="large-text dropdown-text">
                    NY Times Hardcover Fiction Bestsellers
                  </strong>
                </Link>
                <Link
                  className="nav-item nav-link text-light p-3"
                  to="/hardcover-non-fiction-recommendations"
                >
                  <strong className="large-text dropdown-text">
                    NY Times Hardcover Nonfiction Bestsellers
                  </strong>
                </Link>
                <Link
                  className="nav-item nav-link text-light p-3"
                  to="/paperback-fiction-recommendations"
                >
                  <strong className="large-text dropdown-text">
                    NY Times Paperback Fiction Bestsellers
                  </strong>
                </Link>
                <Link
                  className="nav-item nav-link text-light p-3"
                  to="/paperback-non-fiction-recommendations"
                >
                  <strong className="large-text dropdown-text">
                    NY Times Paperback Nonfiction Bestsellers
                  </strong>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-11 text-center">
          <div className="d-flex justify-content-end">
            <Link
              className="nav-item nav-link text-light p-3 pe-4 text-decoration-none nav-hover"
              to="/register"
            >
              <strong className="navbar-hover-color add-shadow">
                Register
              </strong>
            </Link>
            <Link
              className="nav-item nav-link text-light p-3 pe-4 text-decoration-none nav-hover"
              to="/login"
            >
              <strong className="navbar-hover-color add-shadow">Login</strong>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
