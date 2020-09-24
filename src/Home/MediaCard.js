import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import history from '../history'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

export default function MediaCard(prop) {
  const classes = useStyles();
  const {data} = prop
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push('/letterHead')}>
        <CardMedia
          className={classes.media}
          image={data.previewURL}
          title={data.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {data.title}
          </Typography>
          <Typography variant="body1" component="h1">
          Report Date: {data.reportDate}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
