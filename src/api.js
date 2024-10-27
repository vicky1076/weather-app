// src/api.js
import axios from 'axios';

const API_KEY = '095d16ce33d3e082386ed03ac609cff0';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
  return response.data;
};

export const fetchForecast = async (city) => {
  const response = await axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
  return response.data;
};
