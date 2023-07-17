import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function MainFeaturedPost(props) {
    const { post } = props;

    return (
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
                        <Typography
                            variant="body1"
                            color="inherit"
                            paragraph
                            className="line-clamp"
                        >
                            <span
                                dangerouslySetInnerHTML={{ __html: post.body }}
                            />
                        </Typography>
                        <Link to={`/blog/${post.permalink}`}>
                            <Button variant="contained">View Blog</Button>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

// MainFeaturedPost.propTypes = {
//   post: PropTypes.shape({
//     body: PropTypes.string.isRequired,
// image: PropTypes.string.isRequired,
// imageText: PropTypes.string.isRequired,
// linkText: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default MainFeaturedPost;
