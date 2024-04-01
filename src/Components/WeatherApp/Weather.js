import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';  
import clear_icon from '../Assets/clear.png';  
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';  
import wind_icon from '../Assets/wind.png'; 

const WeatherApp = () => {
    const [icon, setIcon] = useState(cloud_icon);
    const [weatherData, setWeatherData] = useState({
        humidity: '64%',
        windSpeed: '18 km/h',
        temperature: '24℃',
        location: 'London'
    });

    // useEffect(() => {
        
    //     fetchData('London');
    // });

    const fetchData = async (city) => {
        const apiKey = "ee7c413f00f4616b1f445cf1ea2b02dd";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        setWeatherData({
            humidity: data.main.humidity + ' %',
            windSpeed: data.wind.speed + ' km/h',
            temperature: data.main.temp + ' ℃',
            location: data.name
        });

        setIcon(getWeatherIcon(data.weather[0].icon));
    };

    const getWeatherIcon = (weatherCode) => {
        const iconMap = {
            '01d': clear_icon,
            '01n': clear_icon,
            '02d': cloud_icon,
            '02n': cloud_icon,
            '03d': drizzle_icon,
            '03n': drizzle_icon,
            '04d': drizzle_icon,
            '04n': drizzle_icon,
            '09d': rain_icon,
            '09n': rain_icon,
            '10d': rain_icon,
            '10n': rain_icon,
            '13d': snow_icon,
            '13n': snow_icon
        };
        return iconMap[weatherCode] || cloud_icon; 
    };

    const handleSearch = () => {
        const cityInput = document.querySelector(".cityInput").value;
        fetchData(cityInput);
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search" />
                <div className='search-icon' onClick={handleSearch}>
                    <img src={search_icon} alt='' />
                </div>
            </div>
            <div className='weather-image'>
                <img src={icon} alt='' />
            </div>
            <div className='weather-temp'>{weatherData.temperature}</div>
            <div className='weather-location'>{weatherData.location}</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt='' className='icon' />
                    <div className='data'>
                        <div className='humidity-percent'>{weatherData.humidity}</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} alt='' className='icon' />
                    <div className='data'>
                        <div className='humidity-percent'>{weatherData.windSpeed}</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
