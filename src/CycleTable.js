import React from 'react'
import PropTypes from 'prop-types'


export default function CycleTable(props) {
  return (
    <section className="section">
      <h1 className="title">Cycles</h1>
      {props.cycleStationOccupancy.map((stationGroup, index) => {
        return (
            <table className="table" key={"cycleStations" + index}>
              <CycleHeaders />
              <tbody key="cycleBody + index">
                <CycleRows stationGroup={stationGroup} />
              </tbody>
            </table>    
        )
      })}
    </section>
  )
}

CycleTable.propTypes = {
  cycleStationOccupancy: PropTypes.array.isRequired
}

function CycleHeaders(props) {
  return (
    <thead><tr key="cycleHeaders">
      <td>Name</td>
      <td>Bikes</td>
      <td>Empty docks</td>
    </tr></thead>
  )
}

function CycleRows(props) {
  return props.stationGroup && props.stationGroup.map(station => {
    return (
      <tr key={station.id}>
        <td key={station.id + 'Name'}>{station.name}</td>
        <td key={station.id + 'Count'}>{station.bikesCount}</td>
        <td key={station.id + 'emptyDocks'}>{station.emptyDocks}</td>
      </tr>
    )
  })

}
