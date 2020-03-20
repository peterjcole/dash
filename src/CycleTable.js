import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import TimeAgo from 'timeago-react';
import BeatLoader from "react-spinners/BeatLoader";



export default function CycleTable(props) {
  return (
    <section className="section">
      <nav className="level">
        <div class="level-left">
          <div class="level-item"><h1 className="title">Cycles</h1></div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <span class="has-text-grey is-size-6">Last updated: {props.lastUpdated ? <TimeAgo datetime={props.lastUpdated} /> : "never"}</span>
          </div>
          <div class="level-item">
            <button className="button" onClick={props.handleRefresh}>
              <span class="icon is-small"><FontAwesomeIcon icon={faRedoAlt} /></span>
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </nav>
      
      {props.loaded ? props.cycleStationOccupancy.map((stationGroup, index) => {
        return (
          <table className="table" key={"cycleStations" + index}>
            <CycleHeaders />
            <tbody key="cycleBody + index">
              <CycleRows stationGroup={stationGroup} />
            </tbody>
          </table>
        )
      }) : <BeatLoader />}
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
