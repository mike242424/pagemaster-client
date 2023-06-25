import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks($userId: ID!) {
    getBooks(userId: $userId) {
      id
      title
      author
      userId
    }
  }
`;

const GET_HARDCOVER_FICTION_RECOMMENDATIONS = gql`
  query GetHardcoverFictionRecommendations {
    getHardcoverFictionRecommendations {
      results {
        books {
          rank
          title
          author
          description
          book_image
        }
      }
    }
  }
`;

const GET_HARDCOVER_NON_FICTION_RECOMMENDATIONS = gql`
  query GetHardcoverNonFictionRecommendations {
    getHardcoverNonFictionRecommendations {
      results {
        books {
          rank
          title
          author
          description
          book_image
        }
      }
    }
  }
`;

const GET_PAPERBACK_FICTION_RECOMMENDATIONS = gql`
  query GetPaperbackFictionRecommendations {
    getPaperbackFictionRecommendations {
      results {
        books {
          rank
          title
          author
          description
          book_image
        }
      }
    }
  }
`;

const GET_PAPERBACK_NON_FICTION_RECOMMENDATIONS = gql`
  query GetPaperbackNonFictionRecommendations {
    getPaperbackNonFictionRecommendations {
      results {
        books {
          rank
          title
          author
          description
          book_image
        }
      }
    }
  }
`;

const GET_GOOGLE_BOOKS = gql`
  query GetGoogleBooksSearch($query: String!, $page: Int!) {
    getGoogleBooksSearch(query: $query, page: $page) {
      totalItems
      items {
        volumeInfo {
          title
          description
          authors
          imageLinks {
            thumbnail
          }
        }
      }
    }
  }
`;

export {
  GET_BOOKS,
  GET_HARDCOVER_FICTION_RECOMMENDATIONS,
  GET_HARDCOVER_NON_FICTION_RECOMMENDATIONS,
  GET_PAPERBACK_FICTION_RECOMMENDATIONS,
  GET_PAPERBACK_NON_FICTION_RECOMMENDATIONS,
  GET_GOOGLE_BOOKS,
};
