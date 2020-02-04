import React from 'react'
import { SignificantWeatherCodes } from './SignificantWeatherCodes'


export default function WeatherTable(props) {
  return (
    <section className="section">
      <h1 key="weather-title" className="title">Weather</h1>
      {props.weather.map((siteWeather, index) => {
        return (
          <React.Fragment key={index}>
            <h2 className="subtitle is-4">{siteWeather.features[0].properties.location.name}</h2>
            <h2 className="subtitle is-5">{`Between ${props.commutingHours.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} and ${props.commutingHours.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}</h2>
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

function WeatherHeaders(props) {
  return <thead>
    <tr key="weatherHeaderRow">
      <td key="time">Time</td>
      <td key="feelsLike">Feels like temp</td>
      <td key="actual">Actual temp</td>
      <td key="weatherType">Weather type</td>
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
          <td key={timeItem.time + "time"}>{new Date(timeItem.time).toLocaleTimeString()}</td>
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
  }, timeSeries[0].screenTemperature)).toFixed(1)

  const minFeelsLike = parseFloat(timeSeries.reduce((accumulator, currentValue) => {
    return currentValue.feelsLikeTemperature < accumulator ? currentValue.feelsLikeTemperature : accumulator
  }, timeSeries[0].feelsLikeTemperature)).toFixed(1)

  const maxPrecip = timeSeries.reduce((accumulator, currentValue) => {
    return currentValue.probOfPrecipitation > accumulator ? currentValue.probOfPrecipitation : accumulator
  }, null)


  return (
    <nav className="level">
      <div className="level-item has-text-centered" key="max-feels-like">
        <div>
          <p className="heading" key="heading">Max feels like temp</p>
          <p className="title" key="title">{maxFeelsLike} °C</p>
        </div>
      </div>
      <div className="level-item has-text-centered" key="min-feels-like">
        <div>
          <p className="heading" key="heading">Min feels like temp</p>
          <p className="title" key="title">{minFeelsLike} °C</p>
        </div>
      </div>
      <div className="level-item has-text-centered" key="max-temp">
        <div>
          <p className="heading" key="heading">Max temp</p>
          <p className="title" key="title">{maxTemp} °C</p>
        </div>
      </div>
      <div className="level-item has-text-centered" key="min-temp">
        <div>
          <p className="heading" key="heading">Min temp</p>
          <p className="title" key="title">{minTemp} °C</p>
        </div>
      </div>
      <div className="level-item has-text-centered" key="prob-precip">
        <div>
          <p className="heading" key="heading">Probability of any precipitation</p>
          <p className="title" key="title">{maxPrecip}%</p>
        </div>
      </div>
    </nav>

  )
}