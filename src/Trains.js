import React from 'react'
import { TrainTable } from './TrainTable'
const url = process.env.REACT_APP_NATIONAL_RAIL_HUXLEY_URL
const userJourneys = JSON.parse(process.env.REACT_APP_TRAIN_JOURNEYS)


export default class Trains extends React.Component {

  constructor(props) {
    super(props)

    const trainJourneys = userJourneys.map(journey => {
      return {
        origin: journey[0],
        destination: journey[1],
        services: []
      }
    })

    this.state = { trainJourneys }
  }

  componentDidMount() {
    this.getAllTrains()
  }

  getAllTrains() {
    this.state.trainJourneys.forEach((journey, index) => this.getSingleJourney(journey, index))
  }

  getSingleJourney(journey, index) {
    const queryUrl = `${url}/departures/${journey.origin}/to/${journey.destination}`
    fetch(queryUrl)
    .then(response => response.json())
    .then(journeyDetails => {
      this.getServiceDetails(journeyDetails, index, journey.destination)

    })
    .catch (err => {
      setTimeout(() => this.getSingleJourney(journey, index), 2000)
    })
  }

  getServiceDetails(journeyDetails, journeyIndex, destination) {
    journeyDetails.trainServices.forEach((service, serviceIndex) => {
      const queryUrl = `${url}/service/${service.serviceID}`
      fetch(queryUrl)
        .then(response => response.json())
        .then(serviceDetails => {
          const trainJourneys = [...this.state.trainJourneys]
          const callingPoints = serviceDetails.subsequentCallingPoints[0].callingPoint
          serviceDetails.userDestination = callingPoints.filter(callingPoint => callingPoint.crs === destination)[0]
          trainJourneys[journeyIndex].services.push(serviceDetails)
          this.setState({ trainJourneys })
        })
    })
  }

  render() {
    return <TrainTable trainJourneys={this.state.trainJourneys} />
  }

}