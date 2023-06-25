import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.js";
import Nav from "../components/Nav";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../graphql/mutations";
import Spinner from "../components/Spinner";
import AuthError from "../components/AuthError.jsx";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    variables: {
      registerInput: {
        username,
        password,
      },
    },
    update(
      proxy,
      {
        data: {
          registerUser: { token },
        },
      }
    ) {
      context.login({ token });
      navigate("/");
      window.location.reload();
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser({
      variables: {
        registerInput: {
          username,
          password,
        },
      },
    });

    if (errors.length === 0) {
      setUsername("");
      setPassword("");
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Nav />
      {context.user ? (
        <AuthError />
      ) : (
        <div className="container">
          <div className="row mt-5">
            <div className="col mb-4">
              <h1 className="text-center">
                <strong>Register</strong>
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-8 offset-2 col-lg-6 offset-lg-3">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control mb-4 large-text"
                    type="text"
                    placeholder="Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="form-control mb-4 large-text"
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.length > 0 ? (
                    <div>
                      <ul style={{ border: "1px solid red", padding: "10px" }}>
                        {errors.map((error) => {
                          return (
                            <li
                              className="text-danger"
                              key={Math.random() * 10000}
                              style={{ listStyle: "none" }}
                            >
                              {error.message}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="row">
                    <div className="col-12 text-center">
                      <button className="btn button_color_4 p-3" type="submit">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
