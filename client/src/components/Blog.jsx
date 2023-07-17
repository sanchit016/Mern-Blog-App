import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import AllBlogs from "./AllBlogs";
import SinglePost from "./SinglePost";
import SignInSide from "./user/SignIn";
import Posts from "./user/Posts";
import CreatePost from "./user/CreatePost";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AllBlogs />,
    },
    {
        path: "/blogs",
        element: <AllBlogs />,
    },
    {
        path: "/blog/:id",
        element: <SinglePost />,
    },
    {
        path: "/signin",
        element: <SignInSide />,
    },
    {
        path: "/user/blogs",
        element: <Posts />,
    },
    {
        path: "/post/new",
        element: <CreatePost />,
    },
    {
        path: "/post/:id",
        element: <CreatePost />,
    },

]);

const sections = [
    { title: "Home", url: "/" },
    { title: "Blogs", url: "/blogs" },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MERN BLOG" sections={sections} />
                <RouterProvider router={router} />
            </Container>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </ThemeProvider>
    );
}
