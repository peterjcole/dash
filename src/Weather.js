import React from 'react'
import WeatherTable from './WeatherTable'

const weatherUrl = new URL('https://api-metoffice.apiconnect.ibmcloud.com/metoffice/production/v0/forecasts/point/hourly')

export default class Weather extends React.Component {

  constructor(props) {
    super(props)

    const commutingHours = {
      start: new Date(),
      end: new Date()
    }

    commutingHours.start.setHours(process.env.REACT_APP_COMMUTE_START || 0)
    commutingHours.end.setHours(process.env.REACT_APP_COMMUTE_END || 23)
    commutingHours.start.setMinutes(0)
    commutingHours.end.setMinutes(0)
    
    this.state = {
      weather: [],
      commutingHours
    }

  }

  componentDidMount() {
    
    this.getAllWeather()
  }

  getAllWeather() {
    const weatherSites = JSON.parse(process.env.REACT_APP_WEATHER_SITES)
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
      const weather = [...this.state.weather]
      const timeSeries = siteWeather.features[0].properties.timeSeries
      siteWeather.features[0].properties.timeSeries = timeSeries.filter(weather => {
        const time = new Date(weather.time)
        return time > this.state.commutingHours.start && time < this.state.commutingHours.end
      })
      weather[index] = siteWeather
      this.setState({ weather })
    })
    .catch (err => {
      setTimeout(() => this.getSingleSiteWeather(latLng, index), 2000)
    })
  }

  render() {
    return <WeatherTable weather={this.state.weather} commutingHours={this.state.commutingHours}/>
  }
}