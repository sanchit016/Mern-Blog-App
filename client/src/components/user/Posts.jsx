import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Link as RLink, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import { Pagination } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const blogs = async (pageNo = 1, limit = 5) => {
    const post = (
        await fetch(
            `https://mern-blog-app-vvpv.onrender.com/blogs?pageno=${pageNo}&limit=${limit}`
        )
    ).json();
    return post;
};


export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [postCount, setPostCount] = useState(0);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    const deletePost = (id) => {
        fetch(`https://mern-blog-app-vvpv.onrender.com/${id}`, {
            method: "DELETE",
        });
    };
    const getUser = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                navigate("/signin");
            }
        });
    };

    useEffect(() => {
        getUser();
        if (user) {
            blogs(pageNo, 10).then((post) => {
            const filteredPosts = post.data.filter(
                (post) => post.author === user.email
            );
            setPosts(filteredPosts);
            setPostCount(filteredPosts.length);
            });
        }
    }, [pageNo, user, deletePost]);


    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 5 }}
                    >
                        <Grid item>
                            <Typography variant="h6" color="inherit" noWrap>
                                All Blogs
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" size="small">
                                <RLink to="/post/new">Add</RLink>
                            </Button>
                        </Grid>
                    </Grid>
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                    {posts.map((post) => {
                        if (post.author === user.email) {
                        return (
                            <Grid item key={post._id} xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                }}
                            >
                                <CardMedia
                                component="div"
                                sx={{
                                    // 16:9
                                    pt: "56.25%",
                                }}
                                image="https://source.unsplash.com/random?wallpapers"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="h6"
                                >
                                    {post.title}
                                </Typography>
                                <Typography className="line-clamp">
                                    <span
                                    dangerouslySetInnerHTML={{
                                        __html: post.body,
                                    }}
                                    />
                                </Typography>
                                </CardContent>
                                <CardActions>
                                <Button size="small" variant="outlined">
                                    <RLink to={`/blog/${post.permalink}`}>
                                    View
                                    </RLink>
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="secondary"
                                >
                                    <RLink to={`/post/${post.permalink}`}>
                                    Edit
                                    </RLink>
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                    deletePost(post.permalink);
                                    }}
                                >
                                    Delete
                                </Button>
                                </CardActions>
                            </Card>
                            </Grid>
                        );
                        }
                        return null; // Exclude posts where author doesn't match user email
                    })}
                    </Grid>
                    <Pagination
                        count={Math.ceil(postCount / 10)}
                        variant="outlined"
                        shape="rounded"
                        sx={{ mt: 2 }}
                        onChange={(event, value) => {
                            setPageNo(value);
                        }}
                    />
                </Container>
            </main>
        </ThemeProvider>
    );
}
