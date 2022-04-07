import * as React from "react";
import { Box } from "@mui/system";
import "./WeatherCard.css";

const showDescription = (description) => {
  if (description == null) {
    return <div></div>;
  } else {
    return <p>{description}</p>;
  }
};

export default function WeatherCard(props) {
  return (
    <Box className="weather-card" sx={{ p: 2, border: 1 }}>
      <div>{props.title}</div>
      <div>{props.temperature}</div>
      {showDescription(props.description)}
    </Box>
  );
}
