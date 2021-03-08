import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useToasts } from "react-toast-notifications";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const [albumDetail, setAlbumDetail] = useState([]);
  const { openModal, setOpenModal, selectedAlbum, setAllAlbums } = props;
  const [releaseYearModification, setReleaseYearModification] = useState(false);
  const [releaseYear, setReleaseYear] = useState(selectedAlbum.releaseYear);
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToasts();

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    axios
      .get(
        `https://erp.api.hubup.cloud/t/album/${parseInt(
          selectedAlbum.id
        )}/songs`
      )
      .then((response) => setAlbumDetail(response.data));
  }, [selectedAlbum.id]);

  const changeReleaseYear = () => {
    axios
      .put(
        `https://erp.api.hubup.cloud/t/album/${selectedAlbum.id}/releaseYear`,
        { releaseYear }
      )
      .then(() =>
        axios
          .get(`https://erp.api.hubup.cloud/t/albums/all`)
          .then((response) => setAllAlbums(response.data))
      )
      .then(() => {
        addToast("Release year successfully updated", {
          appearance: "success",
          autoDismiss: true,
        });
      });
    setOpenModal(false);
  };

  const deleteAlbum = (albumId) => {
    axios
      .delete(`https://erp.api.hubup.cloud/t/album/${albumId}/delete`)
      .then(() =>
        axios
          .get(`https://erp.api.hubup.cloud/t/albums/all`)
          .then((response) => setAllAlbums(response.data))
      )
      .then(() => {
        addToast("Album successfully deleted", {
          appearance: "success",
          autoDismiss: true,
        });
      });
    setOpenModal(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <div className={classes.paper}>
          <h1>{selectedAlbum.title}</h1>
          <h3>Tracks :</h3>
          {albumDetail.length !== 0 ? (
            albumDetail.map((song) => (
              <p>
                {song.sequence} - {song.name}
              </p>
            ))
          ) : (
            <p style={{ color: "red" }}>This album is empty</p>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {releaseYearModification ? (
              <TextField
                id="release-year"
                label="Release Year"
                variant="outlined"
                onChange={(event) => setReleaseYear(event.target.value)}
                style={{ marginBottom: "20px" }}
              />
            ) : (
              <p>Release year : {releaseYear}</p>
            )}
            {releaseYearModification ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => changeReleaseYear()}
                style={{ marginBottom: "20px" }}
              >
                Send
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setReleaseYearModification(true)}
                style={{ marginBottom: "20px" }}
              >
                Change release year
              </Button>
            )}
            <Button
              style={{ marginBottom: "20px" }}
              variant="contained"
              color="primary"
              onClick={() => history.push(`/add-songs/${selectedAlbum.id}`)}
            >
              Add songs
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteAlbum(selectedAlbum.id)}
            >
              Delete this album
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
