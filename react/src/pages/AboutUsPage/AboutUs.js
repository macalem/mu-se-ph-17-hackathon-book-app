import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./AboutUs.css";

import Nav from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import { CardMedia } from "@mui/material";

function AboutUs() {
  return (
    <>
      <Nav />
      <div className="aboutUs-form-banner">
        <h2>About Us</h2>
      </div>
      <main>
        {/* Hero unit */}
        <Box>
          <CardMedia
            square
            elevation={0}
            component="img"
            image="https://res.cloudinary.com/kthln10/image/upload/v1661759745/1-banner_eeavpz.png"
            alt="About Banner"
            height="645px"
          ></CardMedia>
        </Box>
        &nbsp; &nbsp;
        <Box>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Who We Are
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              MAKABASA is a filipino web application that promotes the
              Philippine culture which offers Filipino books in different
              genres. Our mission is to help people find their interest in
              different Filipino genre books and advertise our Filipino authors
              for making their works be known. As most of us lost interest in
              the Philippine Literature and don&apos;t know much about our
              Filipino books.
            </Typography>
          </Container>
        </Box>
        &nbsp;&nbsp;
        <div className="about-container">
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              A Few Things You Can Do On MAKABASA
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              paragraph
            >
              As a user, you can browse and search based on book, author&apos;s
              name, and genre. There are also some free books that you can read for a non-users.
            </Typography>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AboutUs;
