import { useQuery } from "@apollo/client";
import Nav from "../components/Nav";
import { GET_PAPERBACK_FICTION_RECOMMENDATIONS } from "../graphql/queries";
import RecommendationBook from "../components/RecommendationBook";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";
import UnauthError from "../components/UnauthError";

export default function PaperbackFictionRecommendations() {
  const { data, loading, error } = useQuery(
    GET_PAPERBACK_FICTION_RECOMMENDATIONS
  );
  const { user } = useContext(AuthContext);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <Nav />
      {user ? (
        <div className="container">
          <div className="row mt-5 card-centered">
            <h1 className="text-center mb-5">
              <strong>NY Times Best Sellers - Paperback Fiction</strong>
            </h1>
            {data?.getPaperbackFictionRecommendations.results.books.map(
              (book) => {
                return <RecommendationBook book={book} key={book.title} />;
              }
            )}
          </div>
        </div>
      ) : (
        <UnauthError />
      )}
    </>
  );
}
