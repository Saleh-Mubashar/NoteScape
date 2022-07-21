import React, { useState, useEffect } from "react";
import Axios from "axios";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { BarLoader } from "react-spinners";

import {
  TextField,
  Box,
  Button,
  Typography,
  ThemeProvider,
  createTheme,
  IconButton,
  Alert,
} from "@mui/material";

import "./Login.css";

function Login(props) {
  //loading state
  const [loading, setLoading] = useState(false);
  //alert display
  const [alertDisplay, setAlertDisplay] = useState(false);
  //user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // error states
  const [emailError, setEmailError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  //show alert if user has already registered
  useEffect(() => {
    props.registered ? setAlertDisplay(true) : setAlertDisplay(false);
  }, []);

  //submit function
  Axios.defaults.withCredentials = true;

  const handleSubmit = () => {
    setEmailError("");
    setErrorMsg("");
    //validate data
    if (email == "" || password == "") {
      setErrorMsg("Please fill in all the fields!");
    } else if (!email.match(/^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/)) {
      setEmailError("Invalid Email!");
    } else {
      setLoading(true);
      //SEND DATA TO SERVER
      Axios.post("/login", {
        email: email,
        password: password,
      }).then((result) => {
        setLoading(false);
        setErrorMsg(result.data.err);
        if (result.data.message !== undefined) {
          props.setUserName(result.data.message[0].username);
          props.setLoggedIn(true);
          navigate("/dashboard", { replace: true });
        }
      });
    }
  };

  //THEME CUSTOMIZATION

  const theme = createTheme({
    typography: {
      fontFamily: "Open Sans",
      h4: {
        fontFamily: "'Exo 2', sans-serif",
      },
    },
    shape: {
      borderRadius: "8px",
    },
    palette: {
      primary: {
        main: "#fff",
      },
      error: {
        main: "#ff0000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Alert
        sx={{
          mb: 2,
          color: "#fff",
          width: "300px",
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, 0)",
          top: "20px",
          display: alertDisplay ? "flex" : "none",
        }}
        variant="filled"
        severity="success"
        action={
          <IconButton
            aria-label="close"
            onClick={() => setAlertDisplay(false)}
            color="primary"
            size="small"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        Account Created! Please Login!
      </Alert>
      <BarLoader
        cssOverride={{ display: loading ? "block" : "none" }}
        width="100%"
        color="rgb(195 40 165)"
        height={2}
      />
      <div className="login__form">
        <IconButton
          onClick={() => navigate("/", { replace: true })}
          size="large"
          className="prev__button"
        >
          <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
        <Button
          onClick={() => navigate("/register", { replace: true })}
          className="next__button"
        >
          Register
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "10px",
          }}
          component={motion.form}
          initial={{ y: 40, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              ease: "easeInOut",
              duration: 0.8,
            },
          }}
          width={{ xs: "330px", sm: "450px", lg: "400px" }}
        >
          <Typography variant="h4" margin="-40px 0px 30px 0px">
            Login
          </Typography>
          <TextField
            className="login__input"
            id="outlined-email"
            label="Email"
            placeholder="Email..."
            size="normal"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            helperText={emailError}
            error={emailError || (errorMsg && email.length == 0) ? true : false}
          />
          <TextField
            className="login__input"
            id="outlined-password"
            label="Password"
            placeholder="Password..."
            size="normal"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            error={errorMsg && password.length == 0 ? true : false}
            sx={{ width: "63%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ color: "#fff", margin: "3px -10px 0px 0px" }}
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Visibility
                        sx={{
                          width: "22px",
                          height: "22px",
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        sx={{
                          width: "22px",
                          height: "22px",
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            className="login__submit"
            onClick={handleSubmit}
            variant="outlined"
          >
            Login
          </Button>
          <p className="error__msg">{errorMsg}</p>
        </Box>
      </div>
    </ThemeProvider>
  );
}
export default Login;
