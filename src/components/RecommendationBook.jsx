import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../graphql/mutations";
import { GET_BOOKS } from "../graphql/queries";
import { useNavigate } from "react-router-dom";
import { capitalizeLettersOfFirstWord } from "../utils/capitalizeFirstLetterOfWords";
import Spinner from "./Spinner";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";

export default function RecommendationBook({ book }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [addBook, { loading }] = useMutation(ADD_BOOK, {
    variables: {
      bookInput: {
        title: capitalizeLettersOfFirstWord(book.title),
        author: book.author,
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
          title: capitalizeLettersOfFirstWord(book.title),
          author: book.author,
          userId: user.id,
        },
      },
    });
  };

  if (loading) return <Spinner />;

  return (
    <>
      <div className="card shadow p-3 ms-5 me-5 mb-5">
        <img className="card-img-top" src={book.book_image} alt="" />
        <div
          className="card-body mt-4"
          style={{
            height: "35rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h4 className="card-title text-center">
            <strong>
              #{book.rank} {capitalizeLettersOfFirstWord(book.title)}
            </strong>
          </h4>
          <p>By: {book.author}</p>
          <p className="card-text">{book.description}</p>
          <div style={{ alignSelf: "center" }}>
            <button
              className="btn button_color_3 align-content-center"
              onClick={handleClick}
            >
              Add to Reading List
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
