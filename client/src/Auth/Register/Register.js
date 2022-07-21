import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Register.css";
import { BarLoader } from "react-spinners";
import { motion } from "framer-motion";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  TextField,
  Box,
  Button,
  Typography,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Register(props) {
  //loading state
  const [loading, setLoading] = useState(false);
  //user input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [passRepeatError, setPassRepeatError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  //submit function

  const handleSubmit = () => {
    setNameError("");
    setEmailError("");
    setPassError("");
    setPassRepeatError("");
    setErrorMsg("");

    //validate data

    if (name == "" || email == "" || password == "" || passwordRepeat == "") {
      setErrorMsg("Please fill in all the fields!");
    } else if (!name.match(/^[a-zA-Z0-9]+$/)) {
      setNameError("Only Letters and Numbers are allowed!");
    } else if (!email.match(/^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/)) {
      setEmailError("Invalid Email!");
    } else if (password.length < 6) {
      setPassError("Password is too short!");
    } else if (passwordRepeat !== password) {
      setPassRepeatError("Passwords do not match!");
    } else {
      setLoading(true);
      //SEND DATA TO SERVER
      Axios.post("/register", {
        name: name,
        email: email,
        password: password,
      }).then((result) => {
        setLoading(false);
        setErrorMsg(result.data.err);
        if (result.data.registered) {
          props.setRegistered(true);
          navigate("/login", { replace: true });
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
      <BarLoader
        cssOverride={{ display: loading ? "block" : "none" }}
        width="100%"
        color="rgb(195 40 165)"
        height={2}
      />
      <div className="register__form">
        <IconButton
          onClick={() => navigate("/", { replace: true })}
          size="large"
          className="prev__button"
        >
          <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
        <Button
          onClick={() => navigate("/login", { replace: true })}
          className="next__button"
        >
          Login
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
          <Typography variant="h4" margin="-20px 0px 30px 0px">
            Register
          </Typography>
          <TextField
            className="register__input"
            id="outlined-error-helper-text"
            label="Name"
            placeholder="Name..."
            size="normal"
            onChange={(e) => setName(e.target.value)}
            helperText={nameError}
            error={nameError || (errorMsg && name.length == 0) ? true : false}
          />
          <TextField
            className="register__input"
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
            className="register__input"
            id="outlined-password"
            label="Password"
            placeholder="Password..."
            size="normal"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            helperText={passError}
            error={
              passError || (errorMsg && password.length == 0) ? true : false
            }
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
          <TextField
            className="register__input"
            id="outlined-password-repeat"
            label="Password Repeat"
            placeholder="Password Repeat..."
            size="normal"
            type={showRepeatPassword ? "text" : "password"}
            onChange={(e) => setRepeatPassword(e.target.value)}
            helperText={passRepeatError}
            error={
              passRepeatError || (errorMsg && passwordRepeat.length == 0)
                ? true
                : false
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ color: "#fff", margin: "3px -10px 0px 0px" }}
                    aria-label="toggle password visibility"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  >
                    {showRepeatPassword ? (
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
            className="register__submit"
            onClick={handleSubmit}
            variant="outlined"
          >
            Register
          </Button>
          <p className="error__msg">{errorMsg}</p>
        </Box>
      </div>
    </ThemeProvider>
  );
}
export default Register;
