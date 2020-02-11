const fetch = require('node-fetch')

const weatherUrl = new URL('https://api-metoffice.apiconnect.ibmcloud.com/metoffice/production/v0/forecasts/point/hourly')
weatherUrl.searchParams.append('excludeParameterMetadata', true)
weatherUrl.searchParams.append('includeLocationName', true)

const weatherHeaders = {
  'accept': 'application/json',
  'x-ibm-client-id': process.env.MET_OFFICE_DATAHUB_CLIENT_ID,
  'x-ibm-client-secret': process.env.MET_OFFICE_DATAHUB_CLIENT_SECRET
}

const weatherSites = JSON.parse(process.env.WEATHER_SITES)

module.exports = async (req, res) => {
  const weather = await fetchWeather()

  res.json(weather)
}

function fetchWeather () {
  return Promise.all(
    weatherSites.map(weatherSite => {
      weatherUrl.searchParams.append('latitude', weatherSite[0])
      weatherUrl.searchParams.append('longitude', weatherSite[1])
      
      return fetch(weatherUrl, { headers: weatherHeaders })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else return Promise.reject()
        })
    })
  )
}
