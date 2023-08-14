import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { red } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { logoutService } from "../services/AuthService";

import SockJsClient from "react-stomp";
const SOCKET_URL = "http://localhost:8080/pokedex/ws-message";

const pages = ["Pokemons", "Wish List", "Catch List"];
const userSettings = ["Update Password", "Logout"];
const adminSettings = [
  "Pokemon Operations",
  "User Operations",
  "Update Password",
  "Logout",
];
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  let navigate = useNavigate();
  const { logout, isAdmin } = useAuth();

  const [message, setMessage] = useState([]);

  let onConnected = () => {
    console.log("Connected!");
  };

  let onMessageReceived = (msg) => {
    const newMessages = [];
    for (let i = 0; i < message.length; i++) {
      newMessages.push(message[i]);
    }
    newMessages.push(
      `${msg.message} has been released. Click to catch it! /${msg.pokemonId}`
    );
    setMessage(newMessages);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenNotificationMenu = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);

    const selectedTab = event.target.innerText;
    if (selectedTab === "Wish List" || selectedTab === "WISH LIST") {
      navigate({ pathname: "/wish-list" });
    } else if (selectedTab === "Catch List" || selectedTab === "CATCH LIST") {
      navigate({ pathname: "/catch-list" });
    } else if (selectedTab === "Pokemons" || selectedTab === "POKEMONS") {
      navigate({ pathname: "/home" });
    }
  };

  const handleCloseUserMenu = async (event) => {
    setAnchorElUser(null);
    const selectedSetting = event.target.innerText;
    if (selectedSetting === "Logout") {
      const responseStatus = await logoutService();
      if (responseStatus === 200) {
        logout();
      }
    } else if (selectedSetting === "Update Password") {
      navigate({ pathname: "/update-password" });
    } else if (selectedSetting === "User Operations") {
      navigate({ pathname: "/admin/user-operations" });
    } else if (selectedSetting === "Pokemon Operations") {
      navigate({ pathname: "/admin/pokemon-operations" });
    }
  };

  const handleCloseNotificationMenu = (event) => {
    setAnchorElNotification(null);
    const selectedNotification = event.target.innerText;
    const id = selectedNotification.split("/")[1];

    setMessage([]);
    if (id !== undefined) {
      navigate({ pathname: `/pokemons/${id}` });
    }
  };

  return (
    <>
      <SockJsClient
        url={SOCKET_URL}
        topics={["/topic/message"]}
        onConnect={onConnected}
        onMessage={(msg) => onMessageReceived(msg)}
        onDisconnect={console.log("Disconnected!")}
        debug={true}
      />
      <AppBar position="static" sx={{ backgroundColor: "orange" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              src="/logo.png"
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                ml: 2,
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              POKEDEX
            </Typography>
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Avatar
              src="/logo.png"
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              POKEDEX
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Notifications">
                <IconButton onClick={handleOpenNotificationMenu} sx={{ p: 0 }}>
                  <Badge badgeContent={message.length} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElNotification}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNotification)}
                onClose={handleCloseNotificationMenu}
              >
                {message.length === 0 ? (
                  <MenuItem
                    key={"no-notifications"}
                    onClick={handleCloseNotificationMenu}
                  >
                    <Typography textAlign="center">
                      There is no notifications.
                    </Typography>
                  </MenuItem>
                ) : (
                  message.map((m) => (
                    <MenuItem key={m} onClick={handleCloseNotificationMenu}>
                      <Typography textAlign="center">{m}</Typography>
                    </MenuItem>
                  ))
                )}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0, pl: 3 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: red[500] }}>
                    <AssignmentIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isAdmin
                  ? adminSettings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))
                  : userSettings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
