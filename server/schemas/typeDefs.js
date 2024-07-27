const typeDefs = `
    type User {
    _id: ID
    username: String
    email: String

    bookCount: Int
    savedBooks: [Book]!
    }

    Book{
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
    }

    type Auth {
    token: ID!
    user: User
    }

    input saveBookInput {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
    }

    type Query {
    users: [User]
    user(username: String!): User
    me: User
    }

    type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(book: saveBookInput): User
    removeBook(bookId: ID): User
    }

`;
// Check if "password: String" required or not

// Change BookId: ID to String

// Possible shange books to allow a string of authors with,
//    type: Author {
//    name: String
// }
// type: Books {
//    bookId: String
//    authors: [Author]
//    description: String
//    title: String
// }

// Check if savedBooks needs to be added to query
module.exports = typeDefs;