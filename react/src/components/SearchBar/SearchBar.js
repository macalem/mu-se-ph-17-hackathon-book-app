import React from "react";
import Theme from "../../const/theme";
import { Box, Container, TextField, InputAdornment } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Container>
          <Box className="search-container" sx={{ width: 600, margin: "auto", paddingTop: 7, paddingBottom: 7 }}>
            <TextField
              fullWidth
              label="Search"
              color="warning"
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
    </>
  );
}

export default SearchBar;
