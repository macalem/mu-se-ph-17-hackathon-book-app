import React, { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import "../LandingPage/LandingPage.css";
import { useLazyQuery } from "@apollo/client";

import Nav from "../../components/navBar/NavBar";
import BookCard from "../../components/card/BookCard";
import gqlAPI from "../../api/gql";

function AdminPage() {
  const [GetBooks, { data }] = useLazyQuery(gqlAPI.query.GET_BOOKS, {
    variables: {
      filter: "",
    },
  });

  useEffect(() => {
    GetBooks();
  }, [GetBooks]);
  return (
    <>
      <Nav />
      <Grid container spacing={12} id="grid-container">
        {data?.books.map((book) => {
          return (
            book.status === "PENDING" && (
              <Grid xs={4} key={book.id}>
                <BookCard
                  title={book.name}
                  author={book.author}
                  image={book.cover}
                  description={book.description}
                  published_date={book.published_date}
                  dewey={book.dewey_decimal}
                  isbn={book.isbn}
                  status={book.status}
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
