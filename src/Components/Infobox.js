import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "../Infobox.css";

function Infobox({ title, cases, isRed, isGreen, total, ...props }) {
  return (
    <Card
      className={`flex-1 
            cursor-pointer 
            infoBox
               h-48 ${isRed && "infoBox--red"} ${isGreen && "infoBox--green"}`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography className="infobox__title">{title}</Typography>

        <h2 className={`info__cases ${isGreen && "info__cases--green"}`}>
          {cases}
        </h2>

        <Typography className="infobox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Infobox;
