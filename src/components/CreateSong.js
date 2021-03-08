import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/CreateAlbum.scss";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useToasts } from "react-toast-notifications";

const CreateSong = (props) => {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [sequence, setSequence] = useState("");
  const { addToast } = useToasts();
  const [albumDetail, setAlbumDetail] = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`https://erp.api.hubup.cloud/t/albums/all`, {
        cancelToken: source.token,
      })
      .then((response) =>
        setAlbumDetail(
          response.data.filter((album) => album.id === parseInt(id))[0]
        )
      )
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Error: ", err.message);
        }
      });
    return () => {
      source.cancel("API request canceled by user");
    };
  }, []);

  console.log(albumDetail);

  const handleSubmit = () => {
    axios
      .post(`https://erp.api.hubup.cloud/t/album/${id}/song`, {
        name,
        sequence,
      })
      .then(() =>
        addToast("Song successfully added", {
          appearance: "success",
          autoDismiss: true,
        })
      );
    setName("");
    setSequence("");
  };

  return (
    <section className="create-album">
      <h1>Add songs to {albumDetail.title}</h1>
      <div className="form-wrapper">
        <TextField
          value={name}
          id="name"
          label="Name"
          variant="outlined"
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          value={sequence}
          id="sequence"
          label="Sequence"
          variant="outlined"
          onChange={(event) => setSequence(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
        >
          Send
        </Button>
      </div>
    </section>
  );
};

export default CreateSong;
