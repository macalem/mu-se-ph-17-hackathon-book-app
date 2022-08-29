import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./AboutUs.css";

import Nav from '../../components/navBar/NavBar';
import Footer from "../../components/footer/Footer";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

function AboutUs() {
  return (
    <>
    <Nav />
    <div className="aboutUs-form-banner">
        <h2>About Us</h2>
      </div>
    <main>
        {/* Hero unit */}
        <img flex
            src = 'https://res.cloudinary.com/kthln10/image/upload/v1661759745/1-banner_eeavpz.png'
            alt = 'About Banner'
            height= '645px'
            >
        </img>
        &nbsp;
        <Box
          sx={{
            backgroundImage: 'https://res.cloudinary.com/kthln10/image/upload/v1661759745/1-banner_eeavpz.png',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              MAKABASA
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
     <Footer />
    </>
  );
}


export default AboutUs