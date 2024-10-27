// src/components/ForecastCard.js
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #e0f7fa;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  margin: 10px;
  flex: 1;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const DateText = styled.h3`
  margin: 0;
  font-size: 1.5em;
  color: #00796b; // Teal color
`;

const TempText = styled.p`
  font-size: 1.8em;
  font-weight: bold;
  margin: 5px 0;
`;

const ForecastCard = ({ day }) => {
  const date = new Date(day.dt * 1000).toLocaleDateString();
  return (
    <Card>
      <DateText>{date}</DateText>
      <TempText>{Math.round(day.main.temp)}°C</TempText>
      <p>{day.weather[0].description}</p>
    </Card>
  );
};

export default ForecastCard;
