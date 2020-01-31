import React from 'react'

export default function CycleTable(props) {
  return (
    <>
      {props.cycleStationOccupancy.map((stationGroup, index) => {
        return (
          <table id={"cycleStations" + index}>
            <CycleHeaders />
            <tbody>
              <CycleRows stationGroup={stationGroup} />
            </tbody>
          </table>    
        )
      })}
    </>
  )
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
  return props.stationGroup.map (station => {
    return (
      <tr key={station.id}>
        <td>{station.name}</td>
        <td>{station.bikesCount}</td>
        <td>{station.emptyDocks}</td>
      </tr>
    )
  })

}
