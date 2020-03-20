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
      const [origin, destination] = journey
      const queryUrl = `${url}/departures/${origin}/to/${destination}`
      return { services: await fetch(queryUrl)
      .then(response => response.json())
      .then(journeyDetails => {
        return Promise.all(journeyDetails.trainServices.map(async service => {
          return fetchServiceDetails(service, destination)
        }))
      })}
    })
  ).then(journey => {
    journey.services = journey.services && journey.services.filter(service => {
      return service.message !== 'An error has occurred.'})
    .sort((service1, service2) => Date.parse(service1.std) > Date.parse(service2.std))
    return journey
  })
}

function fetchServiceDetails (service, destination) {
  const serviceQueryUrl = `${url}/service/${service.serviceID}`
  return fetch(serviceQueryUrl)
  .then(response => response.json())
  .then(serviceDetails => {
    if (serviceDetails === { message: 'An error has occurred.' }) return Promise.reject()
    const callingPoints = serviceDetails.subsequentCallingPoints ? serviceDetails.subsequentCallingPoints[0].callingPoint : []
    serviceDetails.userDestination = callingPoints.find(callingPoint => callingPoint.crs === destination)
    return serviceDetails
  })
}