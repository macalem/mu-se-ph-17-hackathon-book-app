import React, { useEffect, useState } from 'react';
import Nav from '../../components/navBar/NavBar';
import LandingHeader from '../../components/LandingHeader/LandingHeader';
import SearchBar from '../../components/SearchBar/SearchBar'
import BookCard from '../../components/card/BookCard';
import Grid from '@mui/material/Unstable_Grid2';
import Footer from '../../components/footer/Footer';
import { gql, useLazyQuery } from "@apollo/client";

import './LandingPage.css'

const GET_BOOKS = gql`
  query GetBooks($filter: String) {
    books(filter: $filter) {
      id
      name
      author
      cover
    }
  }
`;

function LandingPage() {
  const [filter, setFilter] = useState("");

  const [GetBooks, { loading, data }] = useLazyQuery(GET_BOOKS, {
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

      <Grid container spacing={12} id="grid-container">
        {data?.books &&
          data.books.map(book => {
            return (
              <Grid xs={4}>
                <BookCard title={book.name} author={book.author} image={book.cover}/>
              </Grid>
            )
          })
      }
        
      </Grid>

      <Footer />
    </>
  )
}

export default LandingPage