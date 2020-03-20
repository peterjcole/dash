import React from 'react';
import CycleTable from './CycleTable'

const cycleStationOccupancyUrl = process.env.REACT_APP_API_URL + '/bikepoints'

export default class Cycles extends React.Component {

  constructor() {
    super()
    this.state = {
      cycleStationOccupancy: [],
      lastUpdated: null,
      loaded: false
    }
  }

  componentDidMount() {
    this.getOccupancy()
  }

  getOccupancy = () => {
    this.setState({ loaded: false }, () => {
      fetch(cycleStationOccupancyUrl, { mode: 'cors' })
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              return response.json()
            } else return Promise.reject()
          })
          .then((cycleStationOccupancy) => {
            this.setState({ cycleStationOccupancy, lastUpdated: Date.now(), loaded: true })
          })
          .catch(err => {
            setTimeout(() => this.getOccupancy(), 1000)
          })
    })
  }

  handleRefresh = () => {
    this.getOccupancy();
  }

  render() {
    return <CycleTable cycleStationOccupancy={this.state.cycleStationOccupancy} lastUpdated={this.state.lastUpdated} handleRefresh={this.handleRefresh} loaded={this.state.loaded}/>
  }
}