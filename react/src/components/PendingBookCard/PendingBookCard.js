import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button, Grid, Box, ThemeProvider } from '@mui/material';
import Theme from '../../const/theme';

export default function PendingBookCard(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleAcceptButton = (event) => {
        const accept = event.target.value;
        const id = props.id;
        const acceptParams = {
            status: accept,
            id: id
        }
        console.log("acceptParams", acceptParams)
        return props.handleButtonClick(acceptParams);
    }

    const handleRejectButton = (event) => {
        const reject = event.target.value;
        const id = props.id;
        const rejectParams = {
            status: reject,
            id: id
        }
        console.log("rejectParams", rejectParams)
        return props.handleButtonClick(rejectParams);
    }

    return (
        <ThemeProvider theme={Theme}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={props.title}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={props.image}
                    alt="Noli Me Tangere"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">by {props.author}</Typography>
                    <CardActions disableSpacing>
                        <Box sx={{ margin: 'auto' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}><Button variant="contained" color='primary' value="ACCEPT" onClick={handleAcceptButton}>Accept</Button></Grid>
                                <Grid item xs={6}><Button variant="outlined" color='error' value="REJECT" onClick={handleRejectButton}>Reject</Button></Grid>
                            </Grid>
                        </Box>
                    </CardActions>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
}