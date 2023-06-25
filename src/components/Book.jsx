import { useMutation } from "@apollo/client";
import { DELETE_BOOK } from "../graphql/mutations";
import { GET_BOOKS } from "../graphql/queries";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";
import Spinner from "./Spinner";
import Oops from "./Oops";

export default function Book({ book }) {
  const { user } = useContext(AuthContext);

  const [deleteBook, { loading, error }] = useMutation(DELETE_BOOK, {
    variables: {
      id: book.id,
    },
    refetchQueries: [
      {
        query: GET_BOOKS,
        variables: {
          userId: user.id,
        },
      },
    ],
  });

  const handleDelete = () => {
    deleteBook({
      id: book.id,
    });
  };

  if (loading) return <Spinner />;
  if (error) return <Oops />;

  return (
    <tr className="col">
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>
        <Link
          className="btn button_color_4 p-3"
          to={"/update-book"}
          state={{ book }}
        >
          Update
        </Link>
      </td>
      <td>
        <button className="btn button_color_2 p-3" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}
