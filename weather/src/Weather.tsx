import WeatherCard from './WeatherCard'
import './Weather.css'
import { useEffect, useState } from 'react'

const Weather = () => {
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    let ignore = false

    const fetchWeatherData = async () => {
      const weatherApi = 'https://weather.tsukumijima.net/api/forecast/city/'
      const cityId = '130010'
      const response = await fetch(`${weatherApi}${cityId}`)
      const data = await response.json()
      if (!ignore) {
        setWeatherData(data.forecasts)
      }
    }

    fetchWeatherData()

    return () => { ignore = true }
  }, [])

  return (
    <div className="weather">
      <h1>天気予報</h1>
      <div className="weather-cards">
        {
          weatherData.map((weather) => {
            return <WeatherCard weatherData={weather} key={weather.date}/>
          })
        }
      </div>
    </div>
  )
}

export default Weather
