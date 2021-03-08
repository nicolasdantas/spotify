import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 0.1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/albums">Albums</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/create-album">Create an album</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/add-songs">Add songs</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
