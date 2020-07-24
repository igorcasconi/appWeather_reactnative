import React, { useState, createContext } from 'react';
import ApiWeather from '../services/ApiWeather';

export const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [dadosWeek, setDadosWeek] = useState([]);
    const [latitudeUser, setLatitudeUser] = useState(0);
    const [longitudeUser, setLongitudeUser] = useState(0);
    const [dados, setDados] = useState({
        idWeather: 0,
        temperatura: 0,
        descricao: '',
        minima: 0,
        maxima: 0,
        pressao: 0,
        umidade: 0,
        cidade: '',
        sunrise: 0,
        sunset: 0
    });
   
    // Configuração para pegar informação da API
    var config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    };

    return (
        <ApiContext.Provider
            value={{
                loading,
                dados,
                dadosWeek,
                latitudeUser,
                longitudeUser,
                setLongitudeUser,
                setLatitudeUser,
                // Dados da Geolocalização Hoje
                loadForecastToday: async (lat: number, lon: number) => {
                    setLoading(true);
                    const response = await ApiWeather.get('weather?lat=' + lat + '&lon=' + lon + '&appid=abe3927727d7b33f53265f1104e1faf7&lang=pt_br&units=metric',config)
                    .then((response) => {
                        setDados({
                            idWeather: response.data.weather[0]['id'],
                            descricao: response.data.weather[0]['description'],
                            temperatura: response.data.main.temp,
                            minima: response.data.main.temp_min,
                            maxima: response.data.main.temp_max,
                            pressao: response.data.main.pressure,
                            umidade: response.data.main.humidity,
                            cidade: response.data.name,
                            sunrise: response.data.sys.sunrise,
                            sunset: response.data.sys.sunset,
                        });
                        setLoading(false);
                    }).catch((err) => console.log(err));
                },
                loadForecastWeek: async (lat: number, lon: number) => {
                        setLoading(true);
                        
                        const response = await ApiWeather.get('forecast?lat=' + lat + '&lon=' + lon + '&appid=abe3927727d7b33f53265f1104e1faf7&lang=pt_br&units=metric', config)
                        .then((response) => {
                            setDadosWeek(response.data.list);
                            setLoading(false);
                        }).catch((err) => console.log(err));
                },
            }}
        
        >
        {children}
        </ApiContext.Provider>
    );
}
