// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { fetchWeather, fetchForecast } from '../api';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: url('https://source.unsplash.com/1600x900/?nature,weather') no-repeat center center fixed;
  background-size: cover;
  color: #f0f0f0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  padding: 20px;
`;

const FormContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  margin: 20px;
  text-align: center;
  width: 90%;
  max-width: 400px;

  @media (max-width: 600px) {
    width: 100%;
    margin: 10px;
  }

  h2, h3 {
    color: #ffeb3b;
  }

  p {
    color: #e0f7fa;
  }
`;

const Form = styled.form`
  margin-bottom: 20px;

  input {
    padding: 10px;
    border: 1px solid #00796b;
    border-radius: 5px;
    width: calc(100% - 22px);
    margin-bottom: 10px;
    font-size: 1em;
  }

  button {
    padding: 10px 15px;
    background: #00796b;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1em;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #005b4f;
    }
  }

  .location-button {
    background: #ff9800;
    margin-top: 10px;

    &:hover {
      background: #e68900;
    }
  }

  .unit-toggle {
    margin-top: 10px;
    cursor: pointer;
    font-size: 1em;
    background: #00796b;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
  }
`;

const LoadingText = styled.p`
  color: white;
  font-size: 1.2em;
`;

const ForecastContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const FavoriteCities = styled.div`
  margin-top: 20px;
`;

const CityButton = styled.button`
  margin: 5px;
  padding: 5px 10px;
  background: #00796b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #005b4f;
  }

  .delete-button {
    margin-left: 10px;
    background: #d32f2f; // Red color for delete
  }
`;

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const getWeather = async (e) => {
    e.preventDefault();
    fetchWeatherData(city);
  };

  const fetchWeatherData = async (city) => {
    setLoading(true);
    try {
      const weatherData = await fetchWeather(city, unit);
      const forecastData = await fetchForecast(city, unit);
      setWeather(weatherData);
      setForecast(forecastData.list);
      setCity('');
    } catch (error) {
      toast.error('City not found. Please try again!');
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const addToFavorites = (city) => {
    if (!favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (cityToRemove) => {
    const newFavorites = favorites.filter((city) => city !== cityToRemove);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const getCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(`${latitude},${longitude}`);
      }, () => {
        toast.error('Geolocation permission denied.');
      });
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <Container>
      <h1>Weather App</h1>
      <FormContainer>
        <Form onSubmit={getWeather}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button type="submit">Get Weather</button>
          <button type="button" className="location-button" onClick={getCurrentLocationWeather}>
            Use Current Location
          </button>
          <div className="unit-toggle" onClick={toggleUnit}>
            Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
          </div>
        </Form>
        {loading && <LoadingText>Loading...</LoadingText>}
        {weather && (
          <WeatherCard weather={weather} onAddToFavorites={addToFavorites} />
        )}
        {forecast.length > 0 && (
          <div>
            <h2>Forecast</h2>
            <ForecastContainer>
              {forecast.slice(0, 5).map((day) => (
                <ForecastCard key={day.dt} day={day} />
              ))}
            </ForecastContainer>
          </div>
        )}
      </FormContainer>
      <FavoriteCities>
        <h2>Favorite Cities</h2>
        {favorites.map((favCity, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <CityButton onClick={() => fetchWeatherData(favCity)}>
              {favCity}
            </CityButton>
            <button
              className="delete-button"
              onClick={() => removeFromFavorites(favCity)}
            >
              Remove
            </button>
          </div>
        ))}
      </FavoriteCities>
    </Container>
  );
};

export default Home;
