import React from 'react';
import CycleTable from './CycleTable'

const cycleStationOccupancyUrl = process.env.REACT_APP_API_URL + '/bikepoints'

export default class Cycles extends React.Component {

  constructor () {
    super()
    this.state = { 
      cycleStationOccupancy: []
    }
  }

  componentDidMount() {
    this.getOccupancy()
  }

  getOccupancy = () => {    
    return fetch(cycleStationOccupancyUrl, { mode: 'cors' })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else return Promise.reject()
    })
    .then((cycleStationOccupancy) => {
      this.setState({ cycleStationOccupancy })
    })
    .catch (err => {
      setTimeout(() => this.getOccupancy(), 1000)
    })
  }

  render() {
    return <CycleTable cycleStationOccupancy={this.state.cycleStationOccupancy} />
  }
}