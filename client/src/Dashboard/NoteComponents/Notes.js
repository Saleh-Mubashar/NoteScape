import { React, useState, useEffect } from "react";
import "./Note.css";

import CreateNote from "./CreateNote";
import Note from "./Note";

import Axios from "axios";
import { v4 as uuid } from "uuid";
import { MoonLoader } from "react-spinners";

function Notes({ searchedText, notes, setNotes, userName, sortType }) {
  //loading state for  getting data
  const [loading, setLoading] = useState(false);
  //states
  const [title, setTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(false);

  //get title and store in state
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  // get text and store in state
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  // add new note to the state array
  const saveHandler = () => {
    if (title !== "" && inputText !== "") {
      setError(false);
      setNotes((prevState) => [
        ...prevState,
        {
          id: uuid(),
          title: title,
          text: inputText,
          date: new Date(),
          displayDate: new Date().toLocaleDateString(),
          displayTime: new Date().toLocaleTimeString(),
        },
      ]);
      //clear the text fields
      setTitle("");
      setInputText("");
    } else {
      setError(true);
    }
  };

  //delete note function
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  //search note function
  const filteredNotes = notes.filter((note) => {
    if (searchedText !== "" && notes.length !== 0) {
      return (
        note.text.toLowerCase().includes(searchedText.toLowerCase()) ||
        note.title.toLowerCase().includes(searchedText.toLowerCase())
      );
    } else {
      return note;
    }
  });

  //different sort methods
  const sortMethods = {
    none: { method: (a, b) => null },
    latest: { method: (a, b) => Date.parse(b.date) - Date.parse(a.date) },
    oldest: { method: (a, b) => Date.parse(a.date) - Date.parse(b.date) },
    ascending: { method: (a, b) => (a.title < b.title ? -1 : 1) },
    descending: { method: (a, b) => (a.title > b.title ? -1 : 1) },
  };

  //sort notes function
  const sortedNotes = filteredNotes.sort(sortMethods[sortType].method);

  //get notes from database
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    setLoading(true);
    Axios.post("/getNotes", {
      username: userName,
    }).then((result) => {
      setLoading(false);
      const data = JSON.parse(result.data[0].notes);
      if (data) {
        setNotes(data);
      }
    });
  }, []);

  return (
    <>
      <div
        className="loader"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, 0)",
          display: loading ? "block" : "none",
        }}
      >
        <MoonLoader color="#fff" size={40} />
      </div>
      <div className="notes" style={{ display: loading ? "none" : "grid" }}>
        {sortedNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            text={note.text}
            date={note.displayDate}
            time={note.displayTime}
            deleteNote={deleteNote}
            notes={notes}
            setNotes={setNotes}
          />
        ))}
        <CreateNote
          titleHandler={titleHandler}
          textHandler={textHandler}
          saveHandler={saveHandler}
          title={title}
          inputText={inputText}
          error={error}
        />
      </div>
    </>
  );
}

export default Notes;
