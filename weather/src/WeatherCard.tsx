import './WeatherCard.css'

const WeatherCard = ({weatherData}) => {
  return (
    <div className="weather-card">
      <div>
        {weatherData.dateLabel}
      </div>
      <div>
      <img src={weatherData.image.url} alt=""/>
      </div>
      <div>
      {weatherData.detail.weather}
      </div>
      <div>
        {weatherData.temperature.max.celsius}℃ / {weatherData.temperature.min.celsius}℃
      </div>
    </div>
  )
}

export default WeatherCard
