import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { Button, CardActionArea, CardActions } from '@mui/material';

 function NoParam() {
  return (
    <Card sx={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          height="200"
          image="/public/assets/noPage.png"
          alt="404 Page Not Found"
        />
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
              404 NOT FOUND!
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Page Not Found
          We can't find the page you're looking for.
          You can either return to the previous page,visit our homepage.
          Visit Homepage
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Home
        </Button>
      </CardActions>
    </Card>
  );
}
export default NoParam