import { React } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";

function CreateNote({
  textHandler,
  titleHandler,
  saveHandler,
  inputText,
  title,
  error,
}) {
  //character limit
  const charLimit = 200;
  const charLeft = charLimit - inputText.length;
  return (
    <div
      className="note create__note"
      style={{
        background: "rgba(255, 255, 255, 0)",
        borderColor: error ? "red" : "rgba(255, 255, 255, 0.326)",
      }}
    >
      <div className="note__header editing">
        <input
          value={title}
          type="text"
          placeholder="Title..."
          onChange={titleHandler}
          maxLength="24"
        ></input>
        <CircularProgress
          size={20}
          variant="determinate"
          value={(title.length / 25) * 100}
          sx={{ color: "#19d2c8" }}
          thickness={6}
        />
      </div>
      <textarea
        cols="10"
        rows="6"
        value={inputText}
        placeholder="Note...."
        onChange={textHandler}
        maxLength="200"
      ></textarea>
      <div className="note__footer">
        <span className="label">{charLeft} left</span>
        <button className="note__save" onClick={saveHandler}>
          Add
        </button>
      </div>
      <LinearProgress
        className="char__progress"
        variant="determinate"
        value={inputText.length / 2}
      />
    </div>
  );
}

export default CreateNote;
