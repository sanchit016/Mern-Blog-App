import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";
import { useEffect } from "react";

function Header(props) {
    const { sections, title } = props;
    const [user, setUser] = useState(null);

    const logOut = async () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                window.location.href = "/blogs";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getUser = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Button size="small">Subscribe</Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    <Link href="/">{title}</Link>
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                {user ? (
                    <div>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={logOut}
                        >
                            Logout
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            href="/user/blogs"
                            sx={{ ml: 1 }}
                        >
                            Your Posts
                        </Button>
                    </div>
                ) : (
                    <Button variant="outlined" size="small" href="/signin">
                        Author Signin
                    </Button>
                )}
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: "space-between", overflowX: "auto" }}
            >
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;
