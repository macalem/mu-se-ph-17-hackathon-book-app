import React, { useEffect, useState } from 'react';
import Nav from '../../components/navBar/NavBar';
import LandingHeader from '../../components/LandingHeader/LandingHeader';
import SearchBar from '../../components/SearchBar/SearchBar'
import BookCard from '../../components/card/BookCard';
import Grid from '@mui/material/Unstable_Grid2';
import Footer from '../../components/footer/Footer';
import { gql, useLazyQuery } from "@apollo/client";
import Container from '@mui/material/Container';

import './LandingPage.css'
import useAuth from '../../hooks/useAuth';

const GET_BOOKS = gql`
  query GetBooks($filter: String) {
    books(filter: $filter) {
      id
      name
      author
      cover
      premium
    }
  }
`;

function LandingPage() {
  const { auth } = useAuth();

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
            data.books.map(book => {
              console.log(auth,book.premium)
              if (!auth?.user && book.premium) { 
                return false
              }
              return (
                <Grid key={book.id} xs={4}>
                  <BookCard title={book.name} author={book.author} image={book.cover} premium={book.premium} />
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default LandingPage