const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default WeatherCard