import ForeCastData from "@/components/ForeCastData"
import Weather from "@/components/Weather"
import React, { useEffect, useState } from "react"
import { AiOutlineSearch } from 'react-icons/ai'

export default function Home() {

  interface weatherData {
    coord: any
    weather: {
      0: {
        icon: string,
        main: string
      },
    },
    main: {
      feels_like: number
      humidity: number
      pressure: number
      temp: number
    },
    wind: {
      speed: number
    },
    name: string
  }

  interface WeeklyForecastData {
    list: {
      dt_txt: string;
      main: {
        temp: number;
        feels_like: number
      };
    }[];
    city: {
      name: string;
    };
  }

  const [city, setCity] = useState('Manila');
  const [weather, setWeather] = useState<weatherData | undefined>(undefined)
  const [weeklyForecast, setWeeklyForecast] = useState<
    WeeklyForecastData | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined)

  const url = `https://api.openweathermap.org/data/2.5/weather${city ? `?q=${city}` : `?q=Manila`}&units=metric&appid=5627b4c67c56705b9ac145253837bcb6`
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast${city ? `?q=${city}` : `?q=Manila`}&units=metric&appid=5627b4c67c56705b9ac145253837bcb6`
  useEffect(() => {
    const fetchManilaWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Manila&units=metric&appid=5627b4c67c56705b9ac145253837bcb6`);
      const data = await response.json();
      setWeather(data);
    };
    fetchManilaWeather();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const [weatherResponse, forecastResponse] = await Promise.all([
          fetch(
            url
          ),
          fetch(
            forecastUrl),
        ]);

        if (!weatherResponse.ok) {
          throw new Error("City not found");
        }
        const weatherData = await weatherResponse.json();

        if (!forecastResponse.ok) {
          throw new Error("City not found");
        }
        const forecastData = await forecastResponse.json();

        setWeather(weatherData);
        setWeeklyForecast(forecastData);
        setError(undefined);
      } catch (error) {
        console.error(error);
        setWeather(undefined);
        setWeeklyForecast(undefined);
        setError("City not found");
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(
          url
        ),
        fetch(
          forecastUrl),
      ]);

      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }
      const weatherData = await weatherResponse.json();

      if (!forecastResponse.ok) {
        throw new Error("City not found");
      }
      const forecastData = await forecastResponse.json();

      setWeather(weatherData);
      setWeeklyForecast(forecastData);
      setError(undefined);
    } catch (error) {
      console.error(error);
      setWeather(undefined);
      setWeeklyForecast(undefined);
      setError("City not found");
    }
  };

  return (
    <>
      {/* overlay */}
      <div className="absolute w-full top-0 bottom-0 left-0 right-0 bg-black/60 z-[1]" />
      {/* image */}
      <div className="bg-my_bg_image relative w-full md:h-screen bg-center bg-cover bg-no-repeat">
        <div className="text-white z-[100] relative flex flex-col items-center md:items-start md:w-full">
          <form onSubmit={handleSubmit} className="flex items-center justify-center w-full">
            <div className="flex mt-10 items-center">
              <AiOutlineSearch size={25} className="absolute ml-3" />
              <input type='text' placeholder="Search location..." onChange={(event) => setCity(event.target.value)} className="w-[300px] md:w-[500px] bg-transparent border border-gray-500 rounded-md py-2 pl-12 pr-2 outline-none" />
            </div>
          </form>
          <div>
          </div>
          <div className="mt-2 md:mt-0 w-full md:px-10">
            {weather ? <Weather data={weather} /> : <p className="text-white content-center">{error}</p>}
          </div>
          <div className="mt-5 md:mt-20 w-full md:px-10">
            {weeklyForecast && <ForeCastData forecastData={weeklyForecast} />}
          </div>
        </div>
      </div>
    </>
  )
}
