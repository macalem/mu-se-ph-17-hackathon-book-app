import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    FormControl, InputLabel, Input,
    FormHelperText, FormGroup, Select,
    MenuItem, FormLabel, RadioGroup,
    Radio, FormControlLabel, TextareaAutosize
} from '@mui/material';
import './AuthorPage.css';
import Footer from '../../components/footer/Footer';

function AuthorPage() {
    const [date, setDate] = React.useState(null);
    const [genre, setGenre] = React.useState('');

    // Function for getting the value of genre select field...
    const handleChangeGenre = (event) => {
        setGenre(event.target.value);
    };

    // Function for getting the values of the form and console loggin it for the api developer's reference...
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        console.log(
            [data.get("bookname"),
            data.get("ddNumber"),
            data.get("ISBN"),
            data.get("Author"),
                date,
                genre,
            data.get("row-radio-buttons-group"),
            data.get("bookLink"),
            data.get("description")]);
    }

    return (
        <>
            <div className="author-page-back-btn">
                <Grid container spacing={12}>
                    <Grid xs={2}>
                        <Link className="back-btn-icon" to="/">
                            <IconButton aria-label="delete">
                                <ArrowBackIcon style={{ "color": "white" }} />
                            </IconButton>
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <div className="author-form-banner">
                <h2>Author Form</h2>
            </div>
            <Container fixed>
                <Grid container spacing={12}>
                    <Grid className="photo-banner-holder" xs={6}>
                        <img src='https://res.cloudinary.com/karlstorage/image/upload/v1661593098/Images/pxws8rrmhmkrnte6wwma.png' alt='authorbanner' />
                    </Grid>
                    <Grid xs={6}>
                        <Box component="form" onSubmit={handleSubmit} >
                            <FormGroup className="form-grp-seperator">
                                <FormControl>
                                    <InputLabel htmlFor="book-name">Book Name</InputLabel>
                                    <Input required id="book-name" aria-describedby="bookName-helper-text" name="bookname" type='text' />
                                    <FormHelperText id="bookName-helper-text">Enter your book title.</FormHelperText>
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="form-grp-seperator">
                                <FormControl>
                                    <InputLabel htmlFor="dewey-decimal">Dewy Decimal</InputLabel>
                                    <Input required id="dewey-decimal" aria-describedby="dd-helper-text" name="ddNumber" type='number' />
                                    <FormHelperText id="dd-helper-text">Enter your dewy decimal number.</FormHelperText>
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="form-grp-seperator">
                                <FormControl>
                                    <InputLabel htmlFor="ISBN">ISBN</InputLabel>
                                    <Input required id="ISBN" aria-describedby="ISBN-helper-text" name="ISBN" type='number' />
                                    <FormHelperText id="ISBN-helper-text">Enter your book ISBN.</FormHelperText>
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="form-grp-seperator">
                                <FormControl>
                                    <InputLabel htmlFor="Author">Author</InputLabel>
                                    <Input id="Author" aria-describedby="Author-helper-text" name="Author" type='text' />
                                    <FormHelperText id="Author-helper-text">Enter your pen-name/name.</FormHelperText>
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="form-grp-seperator">
                                <FormControl>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Publish Date"
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="form-grp-seperator">
                                <FormControl fullWidth>
                                    <InputLabel id="genre-select-label">Genre</InputLabel>
                                    <Select
                                        labelId="genre-select-label"
                                        id="genre-select"
                                        value={genre}
                                        label="Genre"
                                        onChange={handleChangeGenre}
                                    >
                                        <MenuItem value={'Fiction'}>Fiction</MenuItem>
                                        <MenuItem value={'Slice of Life'}>Slice of Life</MenuItem>
                                        <MenuItem value={'Romantic Comedy'}>Romantic Comedy</MenuItem>
                                    </Select>
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="form-grp-seperator">
                                <FormControl>
                                    <FormLabel id="PT-row-radio-buttons-group-label">Premium Type</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="PT-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="Free" control={<Radio />} label="Free" />
                                        <FormControlLabel value="Premium" control={<Radio />} label="Premium" />
                                    </RadioGroup>
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="form-grp-seperator">
                                <FormControl>
                                    <InputLabel htmlFor="bookL">Book Link</InputLabel>
                                    <Input required id="bookL" aria-describedby="bookL-helper-text" name="bookLink" />
                                    <FormHelperText id="bookL-helper-text">Enter your link of the e-book copy.</FormHelperText>
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="form-grp-seperator">
                                <TextareaAutosize
                                    aria-label="description textarea"
                                    placeholder="Description"
                                    style={{ width: `100%` }}
                                    name="description"
                                />
                            </FormGroup>
                            <Button style={{ "backgroundColor": "#CF6766" }} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

export default AuthorPage