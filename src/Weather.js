import React from 'react'
// import weather from './WeatherSample.json'
import { weatherSites } from './config'
import WeatherTable from './WeatherTable'

const weatherUrl = new URL('https://api-metoffice.apiconnect.ibmcloud.com/metoffice/production/v0/forecasts/point/hourly')

export default class Weather extends React.Component {

  constructor(props) {
    super(props)
    this.state = {weather: []}
  }

  componentDidMount() {
    this.getAllWeather()
  }

  getAllWeather() {
    weatherSites.forEach((latLng, index) => this.getSingleSiteWeather(latLng, index))
  }

  getSingleSiteWeather(latLng, index) {
    weatherUrl.searchParams.append('excludeParameterMetadata', true)
    weatherUrl.searchParams.append('includeLocationName', true)
    weatherUrl.searchParams.append('latitude', latLng[0])
    weatherUrl.searchParams.append('longitude', latLng[1])
    return fetch(weatherUrl, {
      headers: {
        'accept': 'application/json',
        'x-ibm-client-id': process.env.REACT_APP_MET_OFFICE_DATAHUB_CLIENT_ID,
        'x-ibm-client-secret': process.env.REACT_APP_MET_OFFICE_DATAHUB_CLIENT_SECRET
      },
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else return Promise.reject()
    })
    .then((siteWeather) => {
      const weather = this.state.weather
      weather[index] = siteWeather
      this.setState({ weather })
    })
    .catch (err => {
      setTimeout(() => this.getSingleSiteWeather(latLng, index), 2000)
    })
  }

  render() {
    return <WeatherTable weather={this.state.weather}/>
  }
}