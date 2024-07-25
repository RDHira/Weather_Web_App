import React, { useState } from 'react';
import Axios from 'axios';

// ***** Background Image *********
const weatherBackgrounds = {
    Sunny: 'sunny.jpg',
    Clear: 'clear.jpg',
    Clouds: 'cloudy.jpg',
    Rain: 'rainy.jpg',
    Snow: 'snowy.jpg',
    Thunderstorm: 'thunderstorm.jpg',
    Drizzle: 'drizzle.jpg',
    Atmosphere: 'atmosphere.jpg',
    Fog: 'fog.jpg',
    Mist:'mist.jpg',
     // for fog, mist, etc.
};

export default function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    const cityChange = (e) => {
        setCity(e.target.value);
    };

    const fetchWeather = async () => {
        try {
            const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=5b86d8c6a6e7b862df018c6ed6ceb79d`);
            setWeather(response.data);
            console.log(response.data);
        } catch (error) {
            console.log("Error fetching weather data", error);
        }
    };

    const handleClick = () => {
        fetchWeather();
    };

    const getBackgroundImage = (weather) => {
        const weatherMain = weather.weather[0].main;
        return weatherBackgrounds[weatherMain] || 'default.jpg';
    };

    return (
        <>
            <div className="weather-app relative  flex justify-center items-center shadow-lg"
                 style={{
                     backgroundImage: weather ? `url(/images/${getBackgroundImage(weather)})` : 'none',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     height: '100vh',
                     width: '100%',
                 }}>
                <div className="main w-[600px] h-[550px] bg-gray-900 rounded-xl bg-opacity-50 p-4">
                      <h1 className='text-3xl font-bold uppercase text-center mt-3'>Weather App</h1>
                    <input
                        className="w-[470px] mx-16 mt-2 p-4 rounded-lg text-black outline-none border-none"
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={cityChange}/>
                    <br />
                    <button
                        className="ml-56 mt-14 w-40 h-12 text-xl font-bold bg-red-600 hover:bg-red-500 rounded-xl"
                        onClick={handleClick}
                    >
                        Show Weather
                    </button>
                    {weather && (
                        <div className="weather-update text-white mt-10">
                            <h1 className="text-4xl font-bold text-center">
                                {weather.name} ({weather.sys.country})
                            </h1>
                            <h3 className="text-2xl text-center mt-4">
                                Temperature: <span className='text-yellow-300'>{(weather.main.temp - 273.15).toFixed(2)}°C</span>
                            </h3>
                            <h3 className="text-2xl text-center mt-4">
                                Weather: <span className='text-yellow-300'>{weather.weather[0].description}</span>
                            </h3>
                            <h3 className="text-2xl text-center mt-4">
                                Humidity: <span className='text-yellow-300'>{weather.main.humidity}%</span>
                            </h3>
                            <h3 className="text-2xl text-center mt-4">
                                Wind Speed: <span className='text-yellow-300'>{weather.wind.speed} m/s</span>
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
