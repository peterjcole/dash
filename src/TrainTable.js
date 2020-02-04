import React from 'react'

export function TrainTable(props) {
  return (
    <section className="section">
      <h1 key="train-title" className="title">Trains</h1>
      {props.trainJourneys.map((journey, index) => {
        return journey && <React.Fragment key={index}>
          <h2 className="subtitle">{`${journey.services[0] && journey.services[0].locationName} to ${journey.services[0] && journey.services[0].userDestination.locationName}`}</h2>
          <table className="table">
            <TrainHeaders />
            <tbody>
            <TrainRows trainJourney={journey} journeyNum={index}/>
            </tbody>
          </table>
        </React.Fragment>
      })}
    </section>
  )
}

function TrainHeaders(props) {
  return (
    <thead>
      <tr key="trainHeaderRow">
        <td key="predictedDep">Predicted departure time</td>
        <td key="platform">Platform</td>
        <td key="numCarriages">Number of carriages</td>
        <td key="predictedArr">Predicted arrival time</td>
      </tr>
    </thead>
  )
}

function TrainRows(props) {
  return props.trainJourney.services.map((service, index) => {
    return (
    <tr key={props.journeyNum + index}>
      <td key={props.journeyNum + "predictedDep"}>{service.etd === "On time" ? service.std : service.etd}</td>
      <td key={props.journeyNum + "platform"}>{service.platform}</td>
      <td key={props.journeyNum + "numCarriages"}>{service.length || "Unknown"}</td>
      <td key={props.journeyNum + "predictedArr"}>{service.userDestination.et === "On time" ? service.userDestination.st : service.userDestination.et}</td>
    </tr>
    )
  })
}