import React, { useEffect, useState } from "react";
import Axios from "axios";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import Register from "./Auth/Register/Register";
import Login from "./Auth/Login/Login";

import "./App.css";

function App() {
  //logged in, registered and user info states
  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);

  //check if user logged in and update name and loggedIn conditon states

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("/loginStatus").then((result) => {
      if (result.data.user && result.data.loggedIn) {
        setUserName(result.data.user[0].username);
        setLoggedIn(result.data.loggedIn);
      }
    });
  }, []);
  return (
    //set up the routes. Some routes will be redirected if user is logged in or not
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              loggedIn ? (
                <Navigate replace to={"/dashboard"} />
              ) : (
                <Home loggedIn={loggedIn} userName={userName} />
              )
            }
          />
          <Route
            exact
            path="dashboard"
            element={
              loggedIn ? (
                <Dashboard userName={userName} />
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            exact
            path="login"
            element={
              loggedIn ? (
                <Navigate replace to={"/"} />
              ) : (
                <Login
                  registered={registered}
                  setLoggedIn={setLoggedIn}
                  setUserName={setUserName}
                />
              )
            }
          />
          <Route
            exact
            path="register"
            element={
              loggedIn ? (
                <Navigate replace to={"/"} />
              ) : (
                <Register setRegistered={setRegistered} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
