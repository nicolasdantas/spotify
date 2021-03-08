import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import {
    useHistory
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TransitionsModal(props) {
    const [albumDetail, setAlbumDetail] = useState([])
    const {openModal, setOpenModal, selectedAlbum, setAllAlbums} = props;
    const [releaseYear, setReleaseYear] = useState(selectedAlbum.releaseYear)
    const classes = useStyles();
    const history = useHistory()

    const handleClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        axios.get(`https://erp.api.hubup.cloud/t/album/${parseInt(selectedAlbum.id)}/songs`)
        .then((response) => setAlbumDetail(response.data))
    }, [])

    const changeReleaseYear = () => {
        axios.put(`https://erp.api.hubup.cloud/t/album/${selectedAlbum.id}/releaseYear`, {releaseYear})
            .then
            (() => axios.get(
                `https://erp.api.hubup.cloud/t/albums/all`
            )
            .then((response) => setAllAlbums(response.data)))
        setOpenModal(false)
    }

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
                        {albumDetail.length !== 0 ? albumDetail.map((song) => <p>{song.name}</p>) : "Cet album est vide"}
                        <div style={{display:'flex', flexDirection:'column'}}>
                        <input value={releaseYear} onChange={(event) => setReleaseYear(event.target.value)} style={{marginBottom: '20px'}}></input>
                        <button onClick={()=> changeReleaseYear()} style={{marginBottom: '20px'}}>Change release year</button>
                        <button onClick={() => history.push(`/add-songs/${selectedAlbum.id}`)}>Add songs ?</button>
                        </div>
                    </div>
                </Fade>
            </Modal>
    );
}
