// src/components/WeatherCard.js
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 20px;
  margin: 10px;
  text-align: center;
`;

const WeatherCard = ({ weather, onAddToFavorites }) => {
  return (
    <Card>
      <h3>{weather.name}</h3>
      <p>{Math.round(weather.main.temp)}°</p>
      <p>{weather.weather[0].description}</p>
      <button onClick={() => onAddToFavorites(weather.name)}>Add to Favorites</button>
      {/* Include additional weather details as needed */}
    </Card>
  );
};

export default WeatherCard;
