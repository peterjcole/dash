import React from 'react'

export function TrainTable(props) {
  return (
    <section className="section">
      <h1 key="train-title" className="title">Trains</h1>
      {props.trainJourneys.map((journey, index) => {
        return journey && <React.Fragment key={index}>
          <h2 className="subtitle is-4">{`${journey.services[0] && journey.services[0].locationName} to ${journey.services[0] && journey.services[0].userDestination.locationName}`}</h2>
          <TrainStats journey={journey} />
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

function TrainStats(props) {
  console.log(props)
  const nextService = props.journey.services[0] 
  console.log(nextService)
  return !nextService ? null : (
    <nav className="level">
      <div className="level-item has-text-centered" key="next-time">
        <div>
          <p className="heading" key="heading">Next train time</p>
          <p className="title" key="value">{nextService.etd === "On time" ? nextService.std : nextService.etd}</p>
        </div>
      </div>
      <div className="level-item has-text-centered " key="next-plat">
        <div>
          <p className="heading" key="heading">Next train platform</p>
          <p className="title" key="value">{nextService.platform}</p>
        </div>
      </div>
      <div className="level-item has-text-centered" key="next-coaches">
        <div>
          <p className="heading" key="heading">Next train coaches</p>
          <p className="title" key="value">{nextService.length || "Unknown"}</p>
        </div>
      </div>
    </nav>
  )
}

function TrainHeaders(props) {
  return (
    <thead>
      <tr key="trainHeaderRow">
        <td key="predictedDep">Predicted departure time</td>
        <td key="platform">Platform</td>
        <td key="numCarriages">Number of coaches</td>
        <td key="predictedArr">Predicted arrival time</td>
      </tr>
    </thead>
  )
}

function TrainRows(props) {
  return props.trainJourney.services.map((service, index) => {
    return (
    <tr key={props.journeyNum + index}>
      <th key={props.journeyNum + "predictedDep"}>{service.etd === "On time" ? service.std : service.etd}</th>
      <td key={props.journeyNum + "platform"}>{service.platform}</td>
      <td key={props.journeyNum + "numCarriages"}>{service.length || "Unknown"}</td>
      <td key={props.journeyNum + "predictedArr"}>{service.userDestination.et === "On time" ? service.userDestination.st : service.userDestination.et}</td>
    </tr>
    )
  })
}