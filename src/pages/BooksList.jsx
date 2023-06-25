import { useQuery } from "@apollo/client";
import Book from "../components/Book";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { GET_BOOKS } from "../graphql/queries";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";
import UnauthError from "../components/UnauthError";
import Oops from "../components/Oops";

export default function Books() {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: {
      userId: user.id,
    },
  });

  if (loading) return <Spinner />;
  if (error) return <Oops />;

  return (
    <>
      <Nav />
      {user ? (
        <div className="container">
          <div className="row mt-5">
            <div className="col-6 mb-4 text-start">
              <h1>
                <strong>My Reading List</strong>
              </h1>
            </div>
            <div className="col-6 mb-4 text-end">
              <Link className="btn button_color_3 p-3" to="/add-book">
                Add Book
              </Link>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-12">
              <table className="table table-hover table-light">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.getBooks.map((book) => {
                    return <Book book={book} key={book.id} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <UnauthError />
      )}
    </>
  );
}
