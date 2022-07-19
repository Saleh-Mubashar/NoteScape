import React, { useState } from "react";

import Header from "./Header/Header";
import Notes from "./NoteComponents/Notes";
import "./Dashboard.css";

function Dashboard(props) {
  //all the notes
  const [notes, setNotes] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [sortType, setSortType] = useState("none")

  return (
    <>
      <Header
        setSearchedText={setSearchedText}
        searchedText={searchedText}
        userName={props.userName}
        notes={notes}
        sort = {sortType}
        setSort={setSortType}
      />
      <div className="main">
        <Notes sortType={sortType} userName={props.userName} notes={notes} setNotes={setNotes} searchedText={searchedText} />
      </div>
    </>
  );
}

export default Dashboard;
