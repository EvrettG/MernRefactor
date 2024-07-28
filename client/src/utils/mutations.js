import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
// This mutaion allow's for a book to be inserted into the database under the savebook mutation in the servers
// schemas. It then returns the the list of books with the new book added
export const SAVE_BOOK = gql`
    mutation saveBook($book: saveBookInput!) {
        saveBook(book: $book) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId        
                authors
                description
                title
                image
                link
            }
        }
    
    }
`
// Same as above but removes a book
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
            }
        }
    }
`