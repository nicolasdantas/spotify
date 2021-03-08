import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import "../style/DisplayAllAlbums.scss"

export class AlbumHelpers{

    static renderAlbumCard(album){
        return(
            <Card className={""} variant="outlined">
                <CardContent>
                    <Typography className={""} color="textSecondary" gutterBottom>
                        {album.title}
                    </Typography>
                    <Typography className={""} color="textSecondary">
                        {album.releaseYear}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {album.author}
                    </Typography>
                </CardContent>
            </Card>
        )
    }


}