const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    books(filter: String): [Book]
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
  }

  input FilterInput {
    genre: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Mutation {
    register(input: RegisterUserRequest!): User
    login(input: LoginInput): Boolean
  }

  input RegisterUserRequest {
    name: String
    email: String
    password: String
  }
`;

module.exports = typeDefs;
