import { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Message } from 'semantic-ui-react'

function Form({setMeasurements, className}) {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  const [cities, setCities] = useState([])
  const [city, setCity] = useState('')
  const BASE_URL = 'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/'

  const getCountries = () => {
    const url = `${BASE_URL}countries?limit=200&page=1&offset=0&sort=asc&order_by=country`
    fetch(url)
    .then(res => res.json())
    .then(({results}) => setCountries(formatCountries(results)))
  }

  useEffect(() => {
    getCountries()
  }, []);

  useEffect(() => {
    if(country) {
      const url = `${BASE_URL}cities?limit=100&page=1&offset=0&sort=asc&country_id=${country}&order_by=city`
      fetch(url)
      .then(res => res.json())
      .then(({results}) => setCities(formatCities(results)))
    }
  }, [country]);

  useEffect(() => {
    if(country && city) {
      const url = `${BASE_URL}measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=2021-04-14T22%3A50%3A00%2B00%3A00&limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=${country}&city=${city}&order_by=datetime`
      fetch(url)
      .then(res => res.json())
      .then(({results}) => setMeasurements(results))
    }
  }, [country, city]);

  const formatCountries = (countries) => {
    return countries.map(({code, name}) => {
      return {key: code, value: code, text: name }
    })
  }

  const formatCities = (cities) => {
    return cities.map(({city}) => {
      return {key: city, value: city, text: city }
    })
  }

  const formatMeasurements = (results, number) => {
    let test = results.map(res => ({...res, number}))
    console.log(test)
    return test
  }

  const handleCountry = (e, data) => {
    setCountry(data.value)
  }

  const handleCity = (e, data) => {
    setCity(data.value)
  }

  const resetForm = () => {
    setCountries([])
    setCountry('')
    setCities([])
    setCity('')
    setMeasurements([])
    getCountries()    
  }

  return (
      <form className={className}>
        <Dropdown placeholder="Select a country" selection options={countries} onChange={handleCountry}/>
        <br />
        {
          cities.length ?
          <Dropdown placeholder="Select a city" selection options={cities} onChange={handleCity}/> :
          <Message size="mini" info className="message">
            <p>No cities.</p>
          </Message>
        }
        <br />
        <Button type="button" onClick={resetForm}>Clear</Button>
      </form>
  );
}

export default Form;

/**
 * 
 {
  "locationId": 10482,
  "location": "US Diplomatic Post: Kabul",
  "parameter": "pm25",
  "value": 17,
  "date": {
      "utc": "2021-04-14T22:30:00+00:00",
      "local": "2021-04-15T03:00:00+04:30"
  },
  "unit": "µg/m³",
  "coordinates": {
      "latitude": 34.535812,
      "longitude": 69.190514
  },
  "country": "AF",
  "city": "Kabul",
  "isMobile": false,
  "isAnalysis": false,
  "entity": "government",
  "sensorType": "reference grade"
}
 */
