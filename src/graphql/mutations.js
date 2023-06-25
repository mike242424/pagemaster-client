import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      id
      username
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      id
      token
      username
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($bookInput: BookInput) {
    addBook(bookInput: $bookInput) {
      id
      userId
      title
      author
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID) {
    deleteBook(id: $id)
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!, $author: String!) {
    updateBook(id: $id, title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

export { REGISTER_USER, LOGIN_USER, ADD_BOOK, DELETE_BOOK, UPDATE_BOOK };
