const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    books(filter: String): [Book]
    book(id: ID!): Book
    users: [User]
    user(id: ID!): User
    genres: [Genre]
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
    isbn: String
    cover: String
    status: String
  }

  type User {
    id: ID
    name: String
    email: String
    roles: [String]
  }

  type Genre {
    id: ID
    name: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Mutation {
    register(input: RegisterUserRequest): User
    login(input: LoginInput): User
    addBook(input: AddBookRequest): Book
    updateBookStatus(input: UpdateBookStatusRequest): UpdateBookStatusResponse
  }

  input AddBookRequest {
    name: String!
    dewey_decimal: String
    description: String
    author: String!
    published_date: String
    genre_id: Int
    premium: Boolean
    file: String
    isbn: String!
  }

  input UpdateBookStatusRequest {
    id: ID!
    status: String!
  }

  type UpdateBookStatusResponse {
    result: String
  }

  input RegisterUserRequest {
    name: String!
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
