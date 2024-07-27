import './App.css';
import React, { useEffect, useState } from 'react'

function App() {

  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const fetchCountry = async () => {
    try {
      
      let response = await fetch('https://crio-location-selector.onrender.com/countries');
      let data = await response.json();

      setCountryList(data);

    } catch (error) {
      console.log(error);
    }
  }

  const fetchState = async () => {
    try {
      
      let response = await fetch('https://crio-location-selector.onrender.com/country=${selectedCountry}/states');
      let data = await response.json();

      setCountryList(data);

    } catch (error) {
      console.log(error);
    }
  }



  useEffect(()=>{
    fetchCountry();
  },[]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div>
        <select onChange={fetchState}>
          <option value="select">Select Country</option>
        {countryList.map((countryName)=>{
          return <option value={countryName}>{countryName}</option>
        })}
        </select>
      </div>
    </div>
  );
}

export default App;
