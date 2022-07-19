import * as React from "react";
import { Grid, Box, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import SaveIcon from "@mui/icons-material/Save";
import { motion } from "framer-motion";

//create our styles
const classes = {
  root: {
    flexGrow: 1,
  },
};
function Features() {
  return (
    <div className="features" style={classes.root}>
      <Grid container padding={2} justifyContent="center" rowGap={8}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          All the Features you Need!
        </motion.h1>
        <Box gap={2} className="feature__cards">
          <Box
            className="feature__card"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 },
            }}
            component={motion.div}
          >
            <CreateIcon></CreateIcon>
            <Typography variant="h6">Create and Edit</Typography>
            <Typography>
              Create new notes!. Each note has a title, description and the date
              of creation.
            </Typography>
          </Box>
          <Box
            className="feature__card"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 },
            }}
            component={motion.div}
          >
            <SaveIcon></SaveIcon>
            <Typography variant="h6">Save and Delete</Typography>
            <Typography>
              You can save your notes to the PlantScale database and also delete
              them.
            </Typography>
          </Box>
          <Box
            className="feature__card"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 },
            }}
            component={motion.div}
          >
            <SearchIcon></SearchIcon>
            <Typography variant="h6">Search and Filter</Typography>
            <Typography>
              Search for the required note and Sort the notes according to the
              date of creation.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </div>
  );
}

export default Features;
