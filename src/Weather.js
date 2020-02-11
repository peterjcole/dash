import React from 'react'
import WeatherTable from './WeatherTable'

const weatherUrl = process.env.REACT_APP_API_URL + '/weather'


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
    this.getWeather()
  }

  getWeather() {
    return fetch(weatherUrl, { mode: 'cors' })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else return Promise.reject()
      
    })
    .then(weather => {
      weather.forEach(site => {
        let timeSeries = site.features[0].properties.timeSeries
        site.features[0].properties.timeSeries = timeSeries.filter(weatherPeriod => {
          const time = new Date(weatherPeriod.time)
          return time > this.state.commutingHours.start && time < this.state.commutingHours.end
        })
      })
      
      return weather
    })
    .then(weather => this.setState({ weather }))
    .catch (err => {
      setTimeout(() => this.getWeather(), 1000)
    })
  }

  render() {
    return <WeatherTable weather={this.state.weather} commutingHours={this.state.commutingHours}/>
  }
}