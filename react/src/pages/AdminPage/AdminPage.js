import React, { useEffect, useState }from 'react';
import Nav from '../../components/navBar/NavBar';
import LandingHeader from '../../components/LandingHeader/LandingHeader';
import BookCard from '../../components/card/BookCard';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import Footer from '../../components/footer/Footer';
import '../LandingPage/LandingPage.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookDetailsPage from './BookDetails';
import { gql, useLazyQuery } from "@apollo/client";

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
  // const [books, setListOfBooks] = useState("");
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
        {
          data?.books.map(book => { 
            return book.status == "PENDING" && (
              <Grid xs={4}>
                <BookCard title={book.name} author={book.author} image={book.image}/>
          
              </Grid>
            )
          })
      }
        
      </Grid>
      </>
    )
  }
  
  export default AdminPage