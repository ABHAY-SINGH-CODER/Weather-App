import {
  IonContent,
  IonPage,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [weather, setWeather] = useState({
    city: '',
    date: '',
    temp: '',
    condition: '',
    icon: '',
    humidity: '',
    wind: '',
  });

  const updateUI = (data: any) => {
    setWeather({
      city: data.name,
      date: new Date().toDateString(),
      temp: `${data.main.temp}°C`,
      condition: data.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      humidity: `${data.main.humidity}%`,
      wind: `${data.wind.speed} km/h`,
    });
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    const apiKey = '3b0da6da8a2c06abef2bb3a9c6bae149'; 
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      updateUI(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoords(lat, lon);
      },
      (error) => {
        console.error('Location error:', error);
      }
    );
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="Content">
          <div className="weather-app">
            <div className="location">
              <h1>{weather.city || 'Loading...'}</h1>
              <p>{weather.date}</p>
            </div>
            <div className="weather-info">
              <div className="temp">{weather.temp}</div>
              <div className="condition">{weather.condition}</div>
              {weather.icon && (
                <img
                  src={weather.icon}
                  alt="weather icon"
                  className="icon"
                />
              )}
            </div>
            <div className="details">
              <div>Humidity: {weather.humidity}</div>
              <div>Wind: {weather.wind}</div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
