import * as React from "react";
import Grid from "@mui/material/Grid";
import "./FavoriteScreen";
import WeatherCard from "./WeatherCard";
import { getAllFavorites } from "../State/FavoriteActions";
import { useState, useEffect } from "react";
import { fetchCurrentWeather } from "../API/ApiRequests";
import { parseCurrentWeather } from "../API/ApiParsers";

const getCurrentWeatherDetailsForCity = async (cityId) => {
  const cityCurrentWeatherResponse = await fetchCurrentWeather(cityId);
  const cityCurrentWeather = parseCurrentWeather(cityCurrentWeatherResponse);
  return cityCurrentWeather;
};

const getFavoriteWeatherDetails = async () => {
  const storeFavorites = getAllFavorites();

  if (storeFavorites.length == 0) {
    return [];
  }

  let favoriteWeatherDetails = [];

  await storeFavorites.map(async (favorite) => {
    const cityId = favorite.key;
    const cityCurrentWeather = await getCurrentWeatherDetailsForCity(cityId);

    const cityTitle = favorite.label;
    const cityTemperature = cityCurrentWeather.temperature;
    const cityWeatherDescription = cityCurrentWeather.weatherText;

    favoriteWeatherDetails.push({
      title: cityTitle,
      temperature: cityTemperature,
      description: cityWeatherDescription,
    });
  });

  return favoriteWeatherDetails;
};

const getWeatherCards = (favoriteWeatherDetails) => {
  if (favoriteWeatherDetails == null || favoriteWeatherDetails.length == 0) {
    return <div></div>;
  }

  // There are favorites to display:
  let key = 0;
  return favoriteWeatherDetails.map((weatherDetails) => {
    return (
      <WeatherCard
        key={key++}
        title={weatherDetails.title}
        temperature={weatherDetails.temperature}
        description={weatherDetails.description}
      />
    );
  });
  //<WeatherCard
};

export default function FavoriteScreen() {
  const [favoriteWeatherDetails, setFavoriteWeatherDetails] = useState([]);

  useEffect(async () => {
    const favoriteWeatherDetails = await getFavoriteWeatherDetails();
    setFavoriteWeatherDetails(favoriteWeatherDetails);
    //console.log(favoriteWeatherDetails);
  }, []);

  return (
    <Grid
      item
      xs={12}
      className="favorite-screen"
      container
      direction="row"
      justifyContent="center"
    >
      <Grid item xs={2}></Grid>
      {getWeatherCards(favoriteWeatherDetails)}
      <Grid item xs={2}></Grid>
    </Grid>
  );
}
