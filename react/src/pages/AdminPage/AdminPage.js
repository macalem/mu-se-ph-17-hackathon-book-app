import React, { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import "../LandingPage/LandingPage.css";
import { gql, useLazyQuery } from "@apollo/client";

import Nav from "../../components/navBar/NavBar";
import PendingBookCards from "../../components/PendingBookCard/PendingBookCard";

const GET_BOOKS = gql`
  query GetBooks($filter: String) {
    books(filter: $filter) {
      id
      name
      author
      cover
      status
    }
  }
`;

function AdminPage() {
  const [GetBooks, { data }] = useLazyQuery(GET_BOOKS, {
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
                <PendingBookCards
                  title={book.name}
                  author={book.author}
                  image={book.image}
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
