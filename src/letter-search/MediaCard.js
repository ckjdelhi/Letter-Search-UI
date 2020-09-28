import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//import history from '../history'
import { Button, Modal } from 'react-bootstrap';

const useStyles = makeStyles({
  root: {
    maxWidth: 210,
  },
  media: {
    height: 50,
  },
  question: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical"
  },
  bg : {
    overlay: {
      background: "#FFFF00"
    }
  },
})
export default function MediaCard(prop) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const classes = useStyles();
  const {data} = prop
  return (
    <div>
    <Card className={classes.root}>
      <CardActionArea onClick={handleShow}>
        <CardMedia
          className={classes.media}
          image={data.title.includes('pdf')?require('../images/pdf.png'):require('../images/doc.png')}
          title={data.title}
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="h5">
          <b>{data.title}</b>
          </Typography>
          <Typography variant="body2" component="h1" overflow="hidden">
          Report Date: {data.reportDate}
          </Typography>
          <Typography variant="body2" className={classes.question} color="textSecondary" component="p">
          {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Modal size="lg" animation = "true" styles={classes.bg}
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{data.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  )
}
