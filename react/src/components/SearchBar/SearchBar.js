import React, { useState } from "react";
import Theme from "../../const/theme";
import { Box, Container, TextField, InputAdornment } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ handleClickFilter }) {
  const [filter, setFilter] = useState("");

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    handleClickFilter(filter);
  };
  return (
    <>
      <form onSubmit={handleClick}>
        <ThemeProvider theme={Theme}>
          <Container>
            <Box
              className="search-container"
              sx={{
                width: 600,
                margin: "auto",
                paddingTop: 7,
                paddingBottom: 7,
              }}
            >
              <TextField
                fullWidth
                label="Search your favorite book, author or genre."
                color="warning"
                value={filter}
                onChange={handleChangeFilter}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {" "}
                      <SearchIcon color="warning" />{" "}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Container>
        </ThemeProvider>
      </form>
    </>
  );
}

export default SearchBar;
