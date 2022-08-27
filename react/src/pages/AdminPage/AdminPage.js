import React, { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import "../LandingPage/LandingPage.css";
import { gql, useLazyQuery } from "@apollo/client";

import Nav from "../../components/navBar/NavBar";
import BookCard from "../../components/card/BookCard";

const GET_BOOKS = gql`
  query GetBooks($filter: String) {
    books(filter: $filter) {
      id
      name
      author
      cover
      status
      description
      published_date
      dewey_decimal
      isbn
      file
    }
  }
`;

function AdminPage() {
  const [GetBooks, { loading, data }] = useLazyQuery(GET_BOOKS, {
    variables: {
      filter: "",
    },
  });

  useEffect(() => {
    GetBooks();
    console.log(data);
  }, [GetBooks]);
  return (
    <>
      <Nav />
      <Grid container spacing={12} id="grid-container">
        {data?.books.map((book) => {
          return (
            book.status == "PENDING" && (
              <Grid xs={4}>
                <BookCard
                  title={book.name}
                  author={book.author}
                  image={book.cover}
                  description={book.description}
                  published_date={book.published_date}
                  dewey={book.dewey_decimal}
                  isbn={book.isbn}
                />
              </Grid>
            )
          );
        })}
      </Grid>
    </>
  );
}

export default AdminPage;
