import React from 'react'
import { SignificantWeatherCodes } from './SignificantWeatherCodes'


export default function WeatherTable(props) {
  return (
    <section className="section is-collapsible">
      <h1 key="weather-title" className="title">Weather</h1>
      {props.weather.map((siteWeather, index) => {
        return (
          <React.Fragment key={index}>
            <h2 className="subtitle is-4">{siteWeather.features[0].properties.location.name}</h2>
            <h2 className="subtitle is-5">{`Between ${formatTime(props.commutingHours.start)} and ${formatTime(props.commutingHours.end)}`}</h2>
            <WeatherStats siteWeather={siteWeather} />
            <table className='table'>
              <WeatherHeaders />
              <tbody>
                <WeatherRows siteWeather={siteWeather} siteNum={0} />
              </tbody>
            </table>
          </React.Fragment>
        )
      })}
    </section>
  )
}

function formatTime(time) {
  return time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
}

function WeatherHeaders(props) {
  return <thead>
    <tr key="weatherHeaderRow">
      <td key="time">Time</td>
      <td key="feelsLike">Feels like temp</td>
      <td key="actual">Actual temp</td>
      <td key="weatderType">Weatder type</td>
      <td key="precipProb">Precip probability</td>
    </tr>
  </thead>
}

function WeatherRows(props) {
  const timeSeries = props.siteWeather.features[0].properties.timeSeries || []
  const today = new Date()
  return timeSeries.filter(timeItem => new Date(timeItem.time).getDate() === today.getDate())
    .map(timeItem => {
      return (
        <tr key={timeItem.time}>
          <th key={timeItem.time + "time"}>{formatTime(new Date(timeItem.time))}</th>
          <td key={timeItem.time + "feelsLike"}>{parseFloat(timeItem.feelsLikeTemperature).toFixed(1)}</td>
          <td key={timeItem.time + "actual"}>{parseFloat(timeItem.screenTemperature).toFixed(1)}</td>
          <td key={timeItem.time + "weatherType"}>{SignificantWeatherCodes[timeItem.significantWeatherCode]}</td>
          <td key={timeItem.time + "precipProb"}>{timeItem.probOfPrecipitation}</td>
        </tr>
      )
    })
}

function WeatherStats(props) {
  const timeSeries = props.siteWeather.features[0].properties.timeSeries

  const maxTemp = parseFloat(timeSeries.reduce((accumulator, currentValue) => {
    return currentValue.screenTemperature > accumulator ? currentValue.screenTemperature : accumulator
  }, null)).toFixed(1)  
  
  const maxFeelsLike = parseFloat(timeSeries.reduce((accumulator, currentValue) => {
    return currentValue.feelsLikeTemperature > accumulator ? currentValue.feelsLikeTemperature : accumulator
  }, null)).toFixed(1)

  const minTemp = parseFloat(timeSeries.reduce((accumulator, currentValue) => {
    return currentValue.screenTemperature < accumulator ? currentValue.screenTemperature : accumulator
  }, timeSeries[0] ? timeSeries[0].screenTemperature : 0)).toFixed(1)

  const minFeelsLike = parseFloat(timeSeries.reduce((accumulator, currentValue) => {
    return currentValue.feelsLikeTemperature < accumulator ? currentValue.feelsLikeTemperature : accumulator
  }, timeSeries[0] ? timeSeries[0].feelsLikeTemperature : 0)).toFixed(1)

  const maxPrecip = timeSeries.reduce((accumulator, currentValue) => {
    return currentValue.probOfPrecipitation > accumulator ? currentValue.probOfPrecipitation : accumulator
  }, null)


  return (
    <nav className="level">
      <div className="level-item has-text-centered" key="max">
        <div>
          <p className="heading" key="heading">Max feels like/actual temp</p>
          <p className="title" key="value">{maxFeelsLike}°C / {maxTemp}°C</p>
        </div>
      </div>
      <div className="level-item has-text-centered " key="min-feels-like">
        <div>
          <p className="heading" key="heading">Min feels like/actual temp</p>
          <p className="title" key="value">{minFeelsLike}°C / {minTemp}°C</p>
        </div>
      </div>
      <div className="level-item has-text-centered" key="prob-precip">
        <div>
          <p className="heading" key="heading">Probability of any precipitation</p>
          <p className="title" key="value">{maxPrecip}%</p>
        </div>
      </div>
    </nav>

  )
}