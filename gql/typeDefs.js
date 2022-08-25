const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    books(filter: FilterInput): [Book]
    book(id: ID!): Book
    users: [User]
    user(id: ID!): User
  }

  type Book {
    id: ID
    name: String
    dewey_decimal: String
    description: String
    author: String
    published_date: String
    genre_id: String
    premium: Boolean
    file: String
  }

  type User {
    id: ID
    name: String
    email: String
    is_admin: Boolean
    title: String
  }

  input FilterInput {
    genre: String
  }
`;

module.exports = typeDefs;
