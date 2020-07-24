import axios from "axios";

const ApiWeather = axios.create({baseURL: "https://api.openweathermap.org/data/2.5/"});

export default ApiWeather;