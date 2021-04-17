import './App.css';
import { useState } from 'react'
import Measurements from './Measurements'
import From from './Form'

function App() {
  const [measurements1, setMeasurements1] = useState([])
  const [measurements2, setMeasurements2] = useState([])
  

  return (
    <main>
      <section className="forms">
        <From setMeasurements={setMeasurements1} className="form1"/>
        <From setMeasurements={setMeasurements2} className="form2"/>
      </section>
      <Measurements measurements1={measurements1} measurements2={measurements2}/>
    </main>
  );
}

export default App;
