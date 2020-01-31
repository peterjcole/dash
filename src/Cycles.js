import React from 'react';
import { stations } from './config'
import CycleTable from './CycleTable'

const cycleStationOccupancyUrl = 'https://api.tfl.gov.uk/Occupancy/BikePoints/'

export default class Cycles extends React.Component {

  constructor () {
    super()
    this.state = { 
      cycleStationOccupancy: []
    }
    
  }

  componentDidMount() {
    this.getAllGroupsOccupancy()
  }

  getAllGroupsOccupancy = () => {
    stations.forEach((stationGroup, index) => setTimeout(() => this.getSingleGroupOccupancy(stationGroup, index), 500))
  }

  getSingleGroupOccupancy = (stationGroup, index) => {
    return fetch(cycleStationOccupancyUrl + stationGroup)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else return Promise.reject()
    })
    .then((stationGroupOccupancy) => {
      const cycleStationOccupancy = this.state.cycleStationOccupancy
      cycleStationOccupancy[index] = stationGroupOccupancy
      this.setState({ cycleStationOccupancy })
    })
    .catch (err => {
      setTimeout(() => this.getSingleGroupOccupancy(stationGroup, index), 2000)
    })
  }

  render() {
    return <CycleTable cycleStationOccupancy={this.state.cycleStationOccupancy} />
  }
}