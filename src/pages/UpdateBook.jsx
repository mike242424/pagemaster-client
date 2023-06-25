import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Nav from "../components/Nav";
import { UPDATE_BOOK } from "../graphql/mutations";
import { GET_BOOKS } from "../graphql/queries";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";
import UnauthError from "../components/UnauthError";
import Spinner from "../components/Spinner";

export default function UpdateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const bookId = location.state?.book?.id;

  const [updateBook, { loading }] = useMutation(UPDATE_BOOK, {
    variables: {
      id: bookId || "",
      title,
      author,
    },
    refetchQueries: [
      {
        query: GET_BOOKS,
        variables: {
          userId: user.id,
        },
      },
    ],
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    onCompleted: () => {
      navigate("/book-list");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateBook({
      variables: {
        id: bookId || "",
        title,
        author,
      },
    });

    if (errors.length === 0) {
      setTitle("");
      setAuthor("");
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Nav />
      {user ? (
        <div className="container">
          <div className="row mt-5">
            <div className="col mb-4">
              <h1 className="text-center">Update Book</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-8 offset-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control mb-4 large-text"
                    type="text"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    className="form-control mb-4 large-text"
                    type="text"
                    placeholder="Author..."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
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
                    <div className=" col text-start">
                      <button className="btn button_color_4 p-3" type="submit">
                        Update
                      </button>
                    </div>
                    <div className="col text-end">
                      <Link className="btn button_color_2 p-3" to="/book-list">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <UnauthError />
      )}
    </>
  );
}
