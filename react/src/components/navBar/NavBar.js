import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ROLES from "../../const/roles";
import "./NavBar.css";

import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

function NavBar() {
  const { auth } = useAuth();
  
  const navigate = useNavigate();
  const logout = useLogout();

  const pages = auth?.user ? (auth?.user?.name !== "Admin" ? [
    { id: 1, name: "Books", link: "/", roles: [ROLES.User] },
    { id: 2, name: "About Us", link: "/about", roles: [] },
    { id: 3, name: "Author", link: "/author", roles: [] }
  ] : [
    { id: 2, name: "About Us", link: "/about", roles: [] },
    { id: 3, name: "Admin", link: "/admin", roles: [ROLES.Admin] }
  ]) : [
    { id: 1, name: "Books", link: "/", roles: [] },
    { id: 2, name: "About Us", link: "/about", roles: [] }
  ];

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar className="nav-body" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                return !page.roles.length ||
                  auth?.roles?.find((role) => page.roles.includes(role)) ? (
                  <Link
                    className="nav-menu-link-mbl"
                    key={page.id}
                    to={page.link}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                ) : (
                  ""
                );
              })}
              {auth?.user ? (
                <Link className="nav-menu-link-mbl" to="/" onClick={signOut}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Sign Out</Typography>
                  </MenuItem>
                </Link>
              ) : (
                <Link className="nav-menu-link-mbl" to="/login">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>

          <Typography variant="title">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/kthln10/image/upload/v1661620394/origLogo_qdjmem.png"
                width={182}
                height={58}
                alt="Makabasa"
              />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              return !page.roles.length ||
                auth?.roles?.find((role) => page.roles.includes(role)) ? (
                <Button
                  className="nav-menu-btn"
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link className="nav-menu-link" to={page.link}>
                    {page.name}
                  </Link>
                </Button>
              ) : (
                ""
              );
            })}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {!auth.user ? (
              <Tooltip title="Open login">
                <Link className="login-link" to="/Login">
                  <div className="login-text">
                    <p className="login-click" sx={{ p: 1 }}>
                      <PersonIcon fontSize="large" />
                    </p>
                  </div>
                </Link>
              </Tooltip>
            ) : (
              <div className="login-text">
                <p className="login-noclick" sx={{ p: 1 }}>
                  {/* Hi, {auth.user.name} | &nbsp; */}
                  <Tooltip title="Logout">
                    <Button className="login-link" onClick={signOut}>
                      <LogoutIcon fontSize="large" />
                    </Button>
                  </Tooltip>
                </p>
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
