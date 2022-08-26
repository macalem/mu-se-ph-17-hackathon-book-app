import React from 'react';
import Nav from '../../components/navBar/NavBar';
import LandingHeader from '../../components/LandingHeader/LandingHeader';
import BookCard from '../../components/card/BookCard';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import Footer from '../../components/footer/Footer';
import '../LandingPage/LandingPage.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookDetailsPage from './BookDetails';
import Books from '../../const/books';
import PendingBookCards from '../../components/PendingBooks/PendingBookCard';

function AdminPage() {
  return (
    <>
      <Nav />
      <Grid container spacing={12} id="grid-container">
        {
          Books.map(book => {
            return (
              <Grid xs={4}>
                <PendingBookCards title={book.name} author={book.author} image={book.image} />

              </Grid>
            )
          })
        }

      </Grid>
    </>
  )
}

export default AdminPage