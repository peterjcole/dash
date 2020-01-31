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
    this.getAllGroupsOccupancy()
  }

  getAllGroupsOccupancy = () => {

    stations.forEach((stationGroup, index) => this.getSingleGroupOccupancy(stationGroup, index))

    console.log(cycleStationOccupancyUrl + stations)

  }

  getSingleGroupOccupancy = (stationGroup, index) => {
    return fetch(cycleStationOccupancyUrl + stationGroup)
    .then((response) => {
      return response.json()
    })
    .then((stationGroupOccupancy) => {
      const cycleStationOccupancy = this.state.cycleStationOccupancy
      cycleStationOccupancy[index] = stationGroupOccupancy
      this.setState({ cycleStationOccupancy })
    });
  }

  render() {
    return <CycleTable cycleStationOccupancy={this.state.cycleStationOccupancy} />
  }
}