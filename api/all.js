const fetch = require('node-fetch')

const cycleStationOccupancyUrl = 'https://api.tfl.gov.uk/Occupancy/BikePoints/'
const stations = JSON.parse(process.env.CUSTOM_BIKE_STATIONS)

module.exports = async (req, res) => {
  const occupancies = await fetchBikeStationOccupancies()

  res.json({
    occupancies
  })
}

function fetchBikeStationOccupancies () {
  return Promise.all(
    stations.map(stationGroup =>
      fetch(cycleStationOccupancyUrl + stationGroup)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else return null
        })
    )
  )
}
