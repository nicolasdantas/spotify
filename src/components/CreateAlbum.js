import React, { useState } from "react";
import axios from "axios";
import "../style/CreateAlbum.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useToasts } from "react-toast-notifications";

const CreateAlbum = () => {
  const [author, setAuthor] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [title, setTitle] = useState("");
  const { addToast } = useToasts();

  const handleSubmit = () => {
    axios
      .post("https://erp.api.hubup.cloud/t/album", {
        author: author,
        releaseYear: releaseYear,
        title: title,
      })
      .then(() => {
        addToast("Album successfully created", {
          appearance: "success",
          autoDismiss: true,
        });
        setAuthor("");
        setReleaseYear("");
        setTitle("");
      });
  };

  return (
    <section className="create-album">
      <h1>Create an album</h1>
      <div className="form-wrapper">
        <TextField
          value={author}
          id="author"
          label="Author"
          variant="outlined"
          onChange={(event) => setAuthor(event.target.value)}
        />
        <TextField
          value={releaseYear}
          id="release-year"
          label="Release year"
          variant="outlined"
          onChange={(event) => setReleaseYear(event.target.value)}
        />
        <TextField
          value={title}
          id="title"
          label="Title"
          variant="outlined"
          onChange={(event) => setTitle(event.target.value)}
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

export default CreateAlbum;
