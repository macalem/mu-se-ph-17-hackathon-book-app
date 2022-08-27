import React, { useEffect, useState } from "react";
import Nav from "../../components/navBar/NavBar";
import LandingHeader from "../../components/LandingHeader/LandingHeader";
import SearchBar from "../../components/SearchBar/SearchBar";
import BookCard from "../../components/card/BookCard";
import Grid from "@mui/material/Unstable_Grid2";
import Footer from "../../components/footer/Footer";
import { gql, useLazyQuery } from "@apollo/client";
import Container from "@mui/material/Container";

import "./LandingPage.css";

const GET_BOOKS = gql`
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
    }
  }
`;

function LandingPage() {
  const [filter, setFilter] = useState("");

  const [GetBooks, { data }] = useLazyQuery(GET_BOOKS, {
    variables: {
      filter: filter,
    },
  });

  useEffect(() => {
    GetBooks();
  }, [GetBooks]);

  const handleClickFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <>
      <Nav />
      <LandingHeader />
      <SearchBar handleClickFilter={handleClickFilter} />
      <Container>
        <Grid container spacing={12} id="grid-container">
          {data?.books &&
            data.books.map((book) => {
              return (
                <Grid xs={4}>
                  <BookCard
                    title={book.name}
                    author={book.author}
                    image={book.cover}
                    description={book.description}
                    published_date={book.published_date}
                    dewey = {book.dewey_decimal}
                    isbn = {book.isbn}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default LandingPage;
