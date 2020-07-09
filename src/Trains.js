import React from 'react'
import { TrainTable } from './TrainTable'

const trainUrl = process.env.REACT_APP_API_URL + '/trains'

export default class Trains extends React.Component {

  constructor(props) {
    super(props)

    this.state = { trainJourneys: undefined }
  }

  componentDidMount() {
    this.getTrains()
  }

  getTrains() {
    fetch(trainUrl, { mode: 'cors' })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else return Promise.reject()
    })
    .then((trainJourneys) => {
      console.log(trainJourneys)
      this.setState({ trainJourneys })
    })
    .catch (err => {
      setTimeout(() => this.getTrains(), 1000)
    })
  }

  render() {
    return <TrainTable trainJourneys={this.state.trainJourneys} />
  }

}