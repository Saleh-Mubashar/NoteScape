import * as React from "react";
import { Grid, Box, Typography, Link } from "@mui/material";
import { motion } from "framer-motion";

function Footer() {
  return (
    <div className="footer">
      <Typography>
        ©2022 <span>NoteScape</span>
      </Typography>
      <Link href="https://townhall.hashnode.com/planetscale-hackathon" target="_blank">
        <Typography>Hashnode x Plantscale Hackathon</Typography>
      </Link>
      <Typography>
        Read the Article on <Link href="#">Hashnode</Link>
      </Typography>
    </div>
  );
}

export default Footer;
