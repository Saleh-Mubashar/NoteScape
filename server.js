//imports
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const compression = require('compression');

const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.json());
app.use(compression());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://note-scape-test.herokuapp.com/"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
//the session we will use to keep user logged in
app.use(
  session({
    key: "userId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 10000000,
    },
  })
);

// USER REGISTRATION
app.post("/register", (req, res) => {
  //user inputs
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  //connect to database
  const db = mysql.createConnection(process.env.DATABASE_URL);
  db.connect(function (err) {
    if (err) {
      throw err;
    } else {
      //check if username or email exisits
      db.query(
        "SELECT * FROM accounts WHERE email = ? OR username = ?",
        [email, name],
        async function (err, result) {
          if (err) {
            console.log(err);
          }
          if (!result.length > 0) {
            //Create new user if does not exist
            // hash password
            bcrypt.hash(password, 10, function (err, hash) {
              if (err) {
                res.send({ err: err });
              } else {
                //insert data
                var sql =
                  "INSERT INTO accounts (username, email, password, notes) VALUES (?,?,?,'')";
                db.query(sql, [name, email, hash], function (err, result) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send({ registered: true });
                  }
                });
              }
            });
          } else {
            res.send({ err: "Username or Email already exists!" });
          }
        }
      );
    }
  });
});

// USER LOGIN
app.post("/login", (req, res) => {
  //get user inputs
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const db = mysql.createConnection(process.env.DATABASE_URL);
  db.connect(function (err) {
    if (err) {
      throw err;
    } else {
      //check if user exists
      db.query(
        "SELECT * FROM accounts WHERE email = ?",
        email,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (result.length > 0) {
              //compare input password with database password
              bcrypt.compare(
                password,
                result[0].password,
                function (err, response) {
                  //if passwords match, create the session cookie
                  if (response) {
                    req.session.user = result;
                    res.send({ message: result });
                  } else {
                    res.send({ err: "Wrong Password!" });
                  }
                }
              );
            } else {
              res.send({ err: "User does not exist!" });
            }
          }
        }
      );
    }
  });
});
//CHECK IF USER IS LOGGED IN
app.get("/loginStatus", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  if (req.session.user) {
    res.clearCookie("userId");
    res.send({ loggedIn: false });
  }
});

// Save Notes
app.post("/saveNotes", (req, res) => {
  //get user notes
  const username = req.body.username;
  const notes = req.body.notes;
  const db = mysql.createConnection(process.env.DATABASE_URL);
  db.connect(function (err) {
    console.log(req.session);
    if (err) {
      throw err;
    } else {
      var sql = "UPDATE accounts SET notes = ? WHERE username = ?";
      db.query(sql, [notes, username], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send({ saved: true });
        }
      });
    }
  });
});

//Get Notes
app.post("/getNotes", (req, res) => {
  const username = req.body.username;
  const db = mysql.createConnection(process.env.DATABASE_URL);
  db.connect(function (err) {
    if (err) {
      throw err;
    } else {
      var sql = "SELECT notes FROM accounts WHERE username = ?";
      db.query(sql, username, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    }
  });
});

app.use(express.static(path.join(__dirname + "/client/build")));
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`running on 5000`);
});
