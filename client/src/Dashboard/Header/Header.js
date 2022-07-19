import React, { useState } from "react";
import Axios from "axios";

import {
  Box,
  Button,
  ThemeProvider,
  createTheme,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";
import Slide from "@mui/material/Slide";

import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";

import { BarLoader } from "react-spinners";
import "./Header.css";

function Header(props) {
  //loading state and the state for if notes are saved or not
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [transition, setTransition] = React.useState(undefined);
  //sort menu and sort states
  const [sortMenu, setSortMenu] = useState(false);
  const [sortAnchorEl, setSortAnchorEl] = React.useState(null);
  const sortOpen = Boolean(sortAnchorEl);

  //Logout function
  Axios.defaults.withCredentials = true;
  const handleLogout = () => {
    Axios.get("/logout");
    window.location.reload(false);
  };

  //Menu Functions
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Alert functions
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => {
        setSaved(false);
        setTransition(() => TransitionUp);
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  //Tooltip style
  const LightToolTip = styled(({ className, ...props }) => (
    <Tooltip
      {...props}
      componentsProps={{ tooltip: { className: className } }}
    />
  ))(`
      background-color: #fff;
      color: rgba(0, 0, 0, 0.87);
      box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
      font-size: 13px;
  `);

  //Save notes to database

  const saveNotes = () => {
    //open loader
    setLoading(true);
    Axios.post("/saveNotes", {
      username: props.userName,
      notes: JSON.stringify(props.notes),
    }).then((result) => {
      //close loader
      setLoading(false);
      setSaved(result.data.saved);
    });
  };

  //THEME CUSTOMIZATION

  const theme = createTheme({
    typography: {
      fontFamily: "Open Sans",
    },
    palette: {
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BarLoader
        cssOverride={{ display: loading ? "block" : "none" }}
        width="100%"
        color="rgb(195 40 165)"
        height={2}
      />
      <Box className="header">
        {/*LEFT MENU CONTAINING LOGOUT BUTTON*/}

        <Box sx={{ display: "flex", flexDirection: "row", columnGap: "10px" }}>
          <IconButton
            aria-label="more"
            id="long-button"
            className="header__menu"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon fontSize="medium" style={{ color: "#fff" }}></MenuIcon>{" "}
          </IconButton>
          <Menu
            disableScrollLock={true}
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "10ch",
              },
            }}
            sx={{
              "& ul.MuiList-root": {
                padding: "0!important",
              },
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

          {/*SEARCH BOX AND SORT MENU*/}

          <Box>
            <TextField
              id="search-bar"
              className="search__notes"
              onChange={(e) => props.setSearchedText(e.target.value)}
              variant="outlined"
              size="small"
              label="Search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "#fff" }}></SearchIcon>
                  </InputAdornment>
                ),
              }}
            />
            <IconButton
              aria-label="more"
              id="long-button"
              className="header__menu"
              aria-controls={sortMenu ? "long-menu" : undefined}
              aria-expanded={sortMenu ? "true" : undefined}
              aria-haspopup="true"
              onClick={(e) => setSortAnchorEl(e.currentTarget)}
            >
              <LightToolTip arrow title="Sort">
                <SortIcon
                  fontSize="medium"
                  style={{ color: "#fff" }}
                ></SortIcon>
              </LightToolTip>
            </IconButton>
            <Menu
              disableScrollLock={true}
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={sortAnchorEl}
              open={sortOpen}
              onClose={() => setSortAnchorEl(null)}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "10ch",
                },
              }}
              sx={{
                "& ul.MuiList-root": {
                  padding: "0!important",
                },
              }}
            >
              <MenuItem onClick={() => props.setSort("none")}>None</MenuItem>
              <MenuItem onClick={() => props.setSort("latest")}>
                Latest
              </MenuItem>
              <MenuItem onClick={() => props.setSort("oldest")}>
                Oldest
              </MenuItem>
              <MenuItem onClick={() => props.setSort("ascending")}>
                A - Z
              </MenuItem>
              <MenuItem onClick={() => props.setSort("descending")}>
                Z - A
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Button onClick={saveNotes} className="save__button">
          Save
        </Button>
      </Box>
      <Snackbar
        TransitionComponent={transition}
        open={saved}
        autoHideDuration={5000}
      >
        <Alert
          severity="success"
          variant="filled"
          action={action}
          sx={{ width: "100%" }}
        >
          Notes Saved!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default Header;
