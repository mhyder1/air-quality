import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer  } from 'recharts';

function Measurements({measurements1, measurements2}) {

    return (
        <section className="measurements">
        <LineChart width={600} height={400} >
            <CartesianGrid strokeDasharray="0" />
            <XAxis dataKey="date.local" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line data={measurements1} type="monotone" dataKey="value" stroke="#8884d8" dot={false}/>
            <Line data={measurements2} type="monotone" dataKey="value" stroke="#d88484" dot={false}/>
        </LineChart>
      </section>
    )
}

export default Measurements

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