const fetch = require('node-fetch')

const url = process.env.NATIONAL_RAIL_HUXLEY_URL
const userJourneys = JSON.parse(process.env.TRAIN_JOURNEYS)

module.exports = async (req, res) => {
  const occupancies = await fetchTrains()

  res.json(occupancies)
}

function fetchTrains () {
  return Promise.all(
    userJourneys.map(async journey => {
      const queryUrl = `${url}/departures/${journey[0]}/to/${journey[1]}`
      return { services: await fetch(queryUrl)
      .then(response => response.json())
      .then(journeyDetails => {
        return Promise.all(journeyDetails.trainServices.map(async service => {
          return fetchServiceDetails(service, journey[1])
        }))
      }) }
    })
  )
}

function fetchServiceDetails (service, destination) {
  const serviceQueryUrl = `${url}/service/${service.serviceID}`
  return fetch(serviceQueryUrl)
  .then(response => response.json())
  .then(serviceDetails => {
    const callingPoints = serviceDetails.subsequentCallingPoints[0].callingPoint
    serviceDetails.userDestination = callingPoints.filter(callingPoint => callingPoint.crs === destination)[0]
    return serviceDetails
  })
}