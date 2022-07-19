import React, { useState } from "react";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { motion } from "framer-motion";

import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

function Note({ id, title, text, date, time, deleteNote, notes, setNotes }) {
  //get current values of text fields and add them in new states for ediitng
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedText, setEditedText] = useState(text);
  const [editing, setEditing] = useState(false);

  //Date Menu Functions
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 20;

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

  //edit note function
  const editHandler = () => {
    //remove text boxes
    setEditing(false);
    const editedNote = notes.filter((note) => {
      //get current note and update data
      if (note.id === id) {
        note.title = editedTitle;
        note.text = editedText;
        return note;
      } else {
        return note;
      }
    });
    setNotes(editedNote);
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

  //return normal notes and if edit icon is clicked, return the text fields for editing

  return (
    <ThemeProvider theme={theme}>
    <motion.div
      className="note"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          ease: "easeInOut",
          duration: 0.3,
        },
      }}
    >
      <div className={"note__header " + (editing ? "editing" : "")}>
        {editing ? (
          <>
            <input
              value={editedTitle}
              type="text"
              onChange={(e) => setEditedTitle(e.target.value)}
              maxLength="24"
            ></input>
            <CircularProgress
              size={20}
              variant="determinate"
              value={(editedTitle.length / 25) * 100}
              sx={{ color: "#19d2c8" }}
              thickness={6}
            />
          </>
        ) : (
          <>
            {title}
            <IconButton
              aria-label="more"
              id="long-button"
              className="header__menu"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ marginRight: "-10px", color: "#fff" }}
            >
              <MoreVertIcon sx={{ fontSize: "20px" }}></MoreVertIcon>
            </IconButton>
            <Menu
              disableScrollLock={true}
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "17ch",
                },
              }}
              sx={{
                "& ul.MuiList-root": {
                  padding: "0!important",
                },
                "& ul.MuiList-root li": {
                  fontSize: "15px!important",
                },
              }}
            >
              <MenuItem>Date: {date}</MenuItem>
              <MenuItem>Time: {time}</MenuItem>
            </Menu>
          </>
        )}
      </div>
      {editing ? (
        <textarea
          cols="10"
          rows="6"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          maxLength="200"
        ></textarea>
      ) : (
        <div className="note__body">{text}</div>
      )}
      {editing ? (
        <>
          <div className="note__footer">
            <span className="label">{200 - editedText.length} left</span>
            <button className="note__save" onClick={editHandler}>
              Update
            </button>
          </div>
          <LinearProgress
            className="char__progress"
            variant="determinate"
            value={editedText.length / 2}
          ></LinearProgress>
        </>
      ) : (
        <div className="note__footer">
          <LightToolTip arrow title="Delete">
            <DeleteForeverOutlinedIcon
              className="note__delete"
              onClick={() => deleteNote(id)}
              aria-hidden="true"
            ></DeleteForeverOutlinedIcon>
          </LightToolTip>
          <LightToolTip arrow title="Edit">
            <EditIcon
              onClick={() => setEditing(true)}
              className="note__edit"
            ></EditIcon>
          </LightToolTip>
        </div>
      )}
    </motion.div>
    </ThemeProvider>
  );
}

export default Note;
