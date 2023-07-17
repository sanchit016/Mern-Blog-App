import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

function FeaturedPost(props) {
    const { post } = props;

    return (
        <Grid item xs={12} md={12}>
            <Link to={`/blog/${post.permalink}`}>
                <CardActionArea component="div">
                    <Card sx={{ display: "flex" }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography component="h2" variant="h5">
                                {post.title}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                            >
                                {post.date}
                            </Typography>
                            <Typography
                                variant="body2"
                                paragraph
                                className="line-clamp"
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: post.body,
                                    }}
                                />
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Continue reading...
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx={{
                                width: 160,
                                display: { xs: "none", sm: "block" },
                            }}
                            image="https://source.unsplash.com/random?wallpapers"
                            alt={post.imageLabel}
                        />
                    </Card>
                </CardActionArea>
            </Link>
        </Grid>
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.shape({
        date: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        // image: PropTypes.string.isRequired,
        // imageLabel: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default FeaturedPost;
