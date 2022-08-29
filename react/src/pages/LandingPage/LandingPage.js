import { useEffect, useState } from "react";
import Nav from "../../components/navBar/NavBar";
import LandingHeader from "../../components/LandingHeader/LandingHeader";
import SearchBar from "../../components/SearchBar/SearchBar";
import BookCard from "../../components/card/BookCard";
import Grid from "@mui/material/Unstable_Grid2";
import Footer from "../../components/footer/Footer";
import { useLazyQuery } from "@apollo/client";
import Container from "@mui/material/Container";

import "./LandingPage.css";
import useAuth from "../../hooks/useAuth";
import gqlAPI from "../../api/gql";
import { Box, Tab, Tabs } from "@mui/material";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

function LandingPage() {
  const { auth } = useAuth();

  const [filter, setFilter] = useState("");

  const [GetBooks, { data }] = useLazyQuery(gqlAPI.query.GET_BOOKS, {
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

  const [tabIndex, setTabIndex] = useState(0);
  const [premium, setPremium] = useState(null);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);

    if (newValue === 0) {
      setPremium(null);
    } else if (newValue === 1) {
      setPremium(0);
    } else if (newValue === 2) {
      setPremium(1);
    }
  };

  return (
    <>
      <Nav />
      <LandingHeader />
      <SearchBar handleClickFilter={handleClickFilter} />

      <Container>
        {auth?.user && (
          <Box>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              aria-label=""
              centered
            >
              <Tab label="All" {...a11yProps(0)} />
              <Tab label="Free" {...a11yProps(1)} />
              <Tab label="Premium" {...a11yProps(2)} />
            </Tabs>
          </Box>
        )}
        <Grid container spacing={12} id="grid-container">
          {data?.books &&
            data.books.map((book) => {
              
              if (book.status !== "APPROVED") return false
              if (!auth?.user && book.premium) return false

              if (auth?.user) {
                if (premium === 0 && book.premium) return false;
                if (premium === 1 && !book.premium) return false;
              }

              return (
                <Grid key={book.id} xs={4}>
                  <BookCard
                    bookID={book.id}
                    title={book.name}
                    author={book.author}
                    image={book.cover}
                    premium={book.premium}
                    description={book.description}
                    published_date={book.published_date}
                    dewey={book.dewey_decimal}
                    isbn={book.isbn}
                    status={book.status}
                    file={book.file}
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
