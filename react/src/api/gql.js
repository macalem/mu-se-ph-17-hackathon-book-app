import { gql } from "@apollo/client";

const query = {
  GET_BOOKS: gql`
    query GetBooks($filter: String) {
      books(filter: $filter) {
        id
        name
        author
        cover
        description
        published_date
        dewey_decimal
        isbn
        premium
        file
        status
      }
    }
  `,
  GET_GENRES: gql`
    query GetGenres {
      genres {
        id
        name
      }
    }
  `,
};

const mutations = {
  LOGIN: gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        id
        name
        email
        roles
      }
    }
  `,

  REGISTER_READER: gql`
    mutation Register($input: RegisterUserRequest!) {
      register(input: $input) {
        id
        name
        email
        roles
      }
    }
  `,
};

export default { query, mutations };
