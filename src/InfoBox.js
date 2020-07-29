import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, ...props }) {
  return (
    <Card className="infoBox" onClick={props.onClick}>
      <CardContent>
        {/* Title */}
        <Typography className="infoBox__title" color="textSecondary">
          <strong>{title}</strong>
        </Typography>

        {/* No. of Cases */}
        <h3 className="infoBox__cases">
          <strong>{cases}</strong>
        </h3>
        {/* Total Cases */}
        <Typography className="infoBox__total">Total Cases: {total}</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
