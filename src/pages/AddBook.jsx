import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Nav from "../components/Nav";
import { ADD_BOOK } from "../graphql/mutations";
import { GET_BOOKS } from "../graphql/queries";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";
import UnauthError from "../components/UnauthError";
import Spinner from "../components/Spinner";
import Oops from "../components/Oops";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState([]);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    variables: {
      bookInput: {
        title,
        author,
        userId: user.id,
      },
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

    addBook({
      variables: {
        bookInput: {
          title,
          author,
          userId: user.id,
        },
      },
    });

    if (errors.length === 0) {
      setTitle("");
      setAuthor("");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Oops />;

  return (
    <>
      <Nav />
      {user ? (
        <div className="container">
          <div className="row mt-5">
            <div className="col mb-4">
              <h1 className="text-center">
                <strong>Add A Book</strong>
              </h1>
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
                    <div className="col-6 text-start">
                      <button className="btn button_color_4 p-3" type="submit">
                        Add Book
                      </button>
                    </div>
                    <div className=" col-6 text-end">
                      <Link
                        className="btn btn button_color_2 p-3"
                        to="/book-list"
                      >
                        Back
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
