import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Button, Grid, Box } from "@mui/material/";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import HeroImg from "../../img/hero.webp";

function Hero() {
  //Page Load Animations
  const sentence = [
    { id: 1, text: "N" },
    { id: 2, text: "o" },
    { id: 3, text: "t" },
    { id: 4, text: "e" },
    { id: 5, text: "S" },
    { id: 6, text: "c" },
    { id: 7, text: "a" },
    { id: 8, text: "p" },
    { id: 9, text: "e" },
  ];
  //Animate each title
  return (
    <>
    <div className="hero">
      <Grid
        margin="0 5%"
        direction={{ xs: "column", md: "row" }}
        container
        spacing={4}
        rowGap={4}
        component={motion.div}
      >
        <Grid
          item
          sx={{
            flexDirection: "column",
            paddingLeft: "0px!important",
          }}
          className="hero__info"
          md={5.5}
          mt={{ md: -4 }}
          paddingTop="0!important"
        >
          <Box
            sx={{
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "unset" },
            }}
            className="text__group"
          >
            <div className="hero__title">
              {sentence.map((letter, i) => (
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: 0.05 + (i * 0.08),
                    ease: "easeInOut",
                  }}
                  key={letter.id}
                >
                  {letter.text}
                </motion.span>
              ))}
            </div>
            <h2>Organize your life and work!</h2>
            <h3>
              The simplest way to create, delete, save and view your Notes.
              Organize your daily tasks and make your life easier.
            </h3>
          </Box>
          <Box
            sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
            className="button__group"
          >
            <Link to="/register">
              <Button className="register" variant="outlined">
                Get Started! <NavigateNextIcon></NavigateNextIcon>
              </Button>
            </Link>
            <Link to="/login">
              <Button className="login" variant="outlined">
                Login
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid
          className="hero__img"
          item
          md={6.5}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
          }}
          component={motion.div}
          initial={{ x: 40, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              ease: "easeInOut",
              duration: 1,
            },
          }}
        >
          <img alt="Hero Image" src={HeroImg} />
        </Grid>
      </Grid>
    </div>
    </>
  );
}

export default Hero;
