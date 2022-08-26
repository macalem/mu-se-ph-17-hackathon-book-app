import React from 'react';
import Nav from '../../components/navBar/NavBar';
import LandingHeader from '../../components/LandingHeader/LandingHeader';
import BookCard from '../../components/card/BookCard';
import Grid from '@mui/material/Unstable_Grid2';
import Footer from '../../components/footer/Footer';
import './LandingPage.css'

// Images
import Book1 from '../../assets/image 5.png';
import Book2 from '../../assets/image 7.png';
import Book3 from '../../assets/image 8.png';

const books = [
  {
    id: 1,
    name: "Noli Me Tangere",
    image: Book1,
    author: "Pepe"
  },
  {
    id: 2,
    name: "Alamat ng Alitaptap",
    image: Book2,
    author: "Mang Jose"
  },
  {
    id: 3,
    name: "Alamat ng Durian",
    image: Book3,
    author: "Mang Pepe"
  },
  {
    id: 4,
    name: "Alamat ng Durian",
    image: Book3,
    author: "Mang Pepe"
  },
]

function LandingPage() {
  return (
    <>
      <Nav />
      <LandingHeader />

      <Grid container spacing={12} id="grid-container">
        {
          books.map(book => {
            return (
              <Grid xs={4}>
                <BookCard title={book.name} author={book.author} image={book.image}/>
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