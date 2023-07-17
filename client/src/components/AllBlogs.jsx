import { Grid, Pagination } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useState } from "react";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";


const sidebar = {
    title: "About",
    description:
        "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
    archives: [
        { title: "March 2020", url: "#" },
        { title: "February 2020", url: "#" },
        { title: "January 2020", url: "#" },
        { title: "November 1999", url: "#" },
        { title: "October 1999", url: "#" },
        { title: "September 1999", url: "#" },
        { title: "August 1999", url: "#" },
        { title: "July 1999", url: "#" },
        { title: "June 1999", url: "#" },
        { title: "May 1999", url: "#" },
        { title: "April 1999", url: "#" },
    ],
    social: [
        { name: "GitHub", icon: GitHubIcon },
        { name: "Twitter", icon: TwitterIcon },
        { name: "Facebook", icon: FacebookIcon },
    ],
};

const blogs = async (pageNo = 1, limit = 5) => {
    const post = (
        await fetch(`https://mern-blog-app-vvpv.onrender.com/blogs?pageno=${pageNo}&limit=${limit}`)
    ).json();
    return post;
};

function AllBlogs() {
    const [posts, setPosts] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [postCount, setPostCount] = useState(0);
    const [featuredPost, setFeaturedPost] = useState({});

    useEffect(() => {
        blogs(pageNo, 5).then((post) => {
            setPosts(post.data);
            setPostCount(post.count);
            setFeaturedPost(post.featured);
        });
    }, [pageNo]);

    return (
        <main>
            <MainFeaturedPost post={featuredPost} />
            <Grid container spacing={5} sx={{ mt: 3 }}>
                {/* <Main title="From the firehose" /> */}
                <Grid
                    item
                    xs={12}
                    md={8}
                    sx={{
                        "& .markdown": {
                            py: 3,
                        },
                    }}
                >
                    <Grid container spacing={4}>
                        {posts &&
                            posts.map((post) => (
                                <FeaturedPost
                                    key={post.permalink}
                                    post={post}
                                />
                            ))}
                    </Grid>

                    <Pagination
                        count={Math.ceil(postCount / 5)}
                        variant="outlined"
                        shape="rounded"
                        sx={{ mt: 2 }}
                        onChange={(event, value) => {
                            setPageNo(value);
                        }}
                    />
                </Grid>
                <Sidebar
                    title={sidebar.title}
                    description={sidebar.description}
                    archives={sidebar.archives}
                    social={sidebar.social}
                />
            </Grid>
        </main>
    );
}

export default AllBlogs;
