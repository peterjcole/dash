import React from 'react'
import { SignificantWeatherCodes } from './SignificantWeatherCodes'

export default function WeatherTable(props) {
  return (
    <>
      <h1 key="weather-title" className="title">Weather</h1>
      {props.weather.map((siteWeather, index) => {
        return (
          <React.Fragment key={index}>
            <h2 className="subtitle">{siteWeather.features[0].properties.location.name}</h2>
            <table className='table'>
              <WeatherHeaders />
              <tbody>
                <WeatherRows siteWeather={siteWeather} siteNum={0} />
              </tbody>
            </table>
          </React.Fragment>
        )
      })}
    </>
  )
}

function WeatherHeaders(props) {
  return <thead>
    <tr key="weatherHeaderRow">
      <td key="time">Time</td>
      <td key="feelsLike">Feels like temp</td>
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
        <td key={timeItem.time + "time"}>{timeItem.time}</td>
        <td key={timeItem.time + "feelsLike"}>{timeItem.feelsLikeTemperature}</td>
        <td key={timeItem.time + "weatherType"}>{SignificantWeatherCodes[timeItem.significantWeatherCode]}</td>
        <td key={timeItem.time + "precipProb"}>{timeItem.probOfPrecipitation}</td>
      </tr>
    )
  })
}