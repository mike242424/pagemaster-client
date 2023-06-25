import { useState } from "react";
import Nav from "../components/Nav";
import { useLazyQuery } from "@apollo/client";
import { GET_GOOGLE_BOOKS } from "../graphql/queries";
import Spinner from "../components/Spinner";
import GoogleBook from "../components/GoogleBook";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";
import UnauthError from "../components/UnauthError";

export default function BookSearch() {
  const [query, setQuery] = useState("");
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useContext(AuthContext);

  const [getGoogleBooks, { data, loading, error, fetchMore }] = useLazyQuery(
    GET_GOOGLE_BOOKS,
    {
      variables: {
        query,
        page: currentPage,
      },
      onCompleted: (data) => {
        setTotalPages(Math.ceil(data.getGoogleBooksSearch.totalItems / 15));
        console.log(data);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    getGoogleBooks({ variables: { query, page: 1 } });

    setSearchQuery(query);
    setQuery("");
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((currentPage += 1));
      getGoogleBooks({ variables: { query: searchQuery, page: currentPage } });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage -= 1));
      getGoogleBooks({ variables: { query: searchQuery, page: currentPage } });
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <Nav />
      {user ? (
        <div className="container">
          <div className="row mt-5 text-center">
            <div className="col-12 mb-4">
              <h1>
                <strong>Search Books</strong>
              </h1>
            </div>
          </div>
          <div className="row text-center mb-1">
            <div className="col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <form className="justify-content-center" onSubmit={handleSubmit}>
                <div className="input-group mb-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Book Name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn button_color_1">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          {data ? (
            <div className="row justify-content-center mb-5">
              <div className="col-auto">
                <button
                  className="btn button_color_3 mr-2"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="btn button_color_3"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="row card-centered">
            {data?.getGoogleBooksSearch.items.map((book) => {
              return <GoogleBook book={book} key={Math.random() * 100000} />;
            })}
          </div>
        </div>
      ) : (
        <UnauthError />
      )}
    </>
  );
}
