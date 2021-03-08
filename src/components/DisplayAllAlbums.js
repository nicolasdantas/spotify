import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "../style/DisplayAllAlbums.scss";
import AlbumDetails from "./AlbumDetails";

// import {AlbumHelpers} from "./AlbumHelpers";

const DisplayAllAlbums = () => {
  const [allAlbums, setAllAlbums] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`https://erp.api.hubup.cloud/t/albums/all`, {
        cancelToken: source.token,
      })
      .then((response) => setAllAlbums(response.data))
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Error: ", err.message);
        }
      });
    return () => {
      source.cancel("API request canceled by user");
    };
  }, [openModal]);

  const useStyles = makeStyles({
    root: {
      minWidth: 350,
      marginBottom: "40px",
      border: "1px solid",
      marginRight: "20px",
      marginLeft: "20px",
    },
    title: {
      fontSize: 20,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();

  const handleClick = (album) => {
    setOpenModal(true);
    setSelectedAlbum(album);
  };

  return (
    <section className="albums">
      {openModal ? (
        <AlbumDetails
          openModal
          setOpenModal={setOpenModal}
          selectedAlbum={selectedAlbum}
          setAllAlbums={setAllAlbums}
        />
      ) : null}
      <h1>All albums</h1>
      <section className="albums-container">
        {allAlbums.length !== 0 &&
          allAlbums.map((album) => {
            // return AlbumHelpers.renderAlbumCard(album)
            return (
              <Card
                className={classes.root}
                variant="outlined"
                onClick={() => handleClick(album)}
                style={{ cursor: "pointer" }}
              >
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {album.title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {album.releaseYear}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {album.author}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </section>
    </section>
  );
};

export default DisplayAllAlbums;
