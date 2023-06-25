import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../graphql/mutations";
import { GET_BOOKS } from "../graphql/queries";
import { useNavigate } from "react-router-dom";
import { formatAuthors } from "../utils/formatAuthors";
import Spinner from "./Spinner";
import Oops from "./Oops";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";

export default function GoogleBook({ book }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    variables: {
      bookInput: {
        title: book.volumeInfo.title,
        author: formatAuthors(book.volumeInfo.authors),
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
    onCompleted: () => {
      navigate("/book-list");
    },
  });

  const handleClick = () => {
    addBook({
      variables: {
        bookInput: {
          title: book.volumeInfo.title,
          author: formatAuthors(book.volumeInfo.authors),
          userId: user.id,
        },
      },
    });
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) return <Spinner />;
  if (error) return <Oops />;

  return (
    <>
      <div className="card shadow p-3 ms-5 me-5 mb-5">
        <img
          className="card-img-top"
          src={
            book.volumeInfo.imageLinks ? (
              book.volumeInfo.imageLinks.thumbnail
            ) : (
              <p>No Photo Available</p>
            )
          }
          alt=""
        />
        <div className="card-body mt-4">
          <h4 className="card-title text-center">
            <strong>{book.volumeInfo.title}</strong>
          </h4>
          <p>By: {formatAuthors(book.volumeInfo.authors)}</p>
          <div
            className={`description ${isExpanded ? "expanded" : ""}`}
            style={{
              maxHeight: isExpanded ? "none" : "10rem",
              overflow: "hidden",
            }}
          >
            <p className="card-text">{book.volumeInfo.description}</p>
          </div>
          {!isExpanded && (
            <button
              className="btn button_color_2 align-content-center"
              onClick={toggleDescription}
            >
              Show More
            </button>
          )}
          {isExpanded && (
            <button
              className="btn button_color_2 align-content-center"
              onClick={toggleDescription}
            >
              Show Less
            </button>
          )}
        </div>
        <div className="text-center mb-3">
          <button
            className="btn button_color_3 align-content-center"
            onClick={handleClick}
          >
            Add to Reading List
          </button>
        </div>
      </div>
    </>
  );
}
