import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const getPost = async (id) => {
    const post = (await fetch(`http://localhost:5050/blog/${id}`)).json();
    return post;
};

function SinglePost() {
    let { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        getPost(id).then((data) => {
            setPost(data);
        });
    }, []);

    return (
        <main>
            <Paper
                sx={{
                    position: "relative",
                    backgroundColor: "grey.800",
                    color: "#fff",
                    mb: 4,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
                }}
            >
                {/* Increase the priority of the hero background image */}
                {
                    <img
                        style={{ display: "none" }}
                        src="https://source.unsplash.com/random?wallpapers"
                        alt={``}
                    />
                }
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: "rgba(0,0,0,.3)",
                    }}
                />
                <Grid container>
                    <Grid item md={6}>
                        <Box
                            sx={{
                                position: "relative",
                                p: { xs: 3, md: 6 },
                                pr: { md: 0 },
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h3"
                                color="inherit"
                                gutterBottom
                            >
                                {post.title}
                            </Typography>
                            <Typography variant="subtitle1">
                                {post.author}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </main>
    );
}

export default SinglePost;
