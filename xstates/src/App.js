import './App.css';
import React, { useEffect, useState } from 'react'

function App() {

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const fetchCountry = async (e) => {
    try {
      
      // if(e.target.value === "select"){
      //   selectedCountry('');
      //   selectedState('');
      //   return;
      // }
      let response = await fetch('https://crio-location-selector.onrender.com/countries');
      let data = await response.json();

      setCountryList(data);

    } catch (error) {
      console.log(error);
    }
  }

  const fetchState = async (e) => {
    try {
      setStateList([]);
      setCityList([]);
      setSelectedCountry('');
      setSelectedState('');
      setSelectedCity('');
      if(e.target.value === "select"){
        setSelectedState('');
        return;
      }

      setSelectedCountry(e.target.value);
      let response = await fetch(`https://crio-location-selector.onrender.com/country=${e.target.value}/states`);
      let data = await response.json();
      
      // console.log(data);
      setStateList(data);

    } catch (error) {
      console.log(error);
    }
  }

  const fetchCity = async (e) => {
    try {

      if(e.target.value === "select"){
        setCityList([]);
        setSelectedState('');
        setSelectedCity('');
        return;
      }
      setSelectedCity('');
      setSelectedState(e.target.value);
      let response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${e.target.value}/cities`);
      let data = await response.json();
      
      // console.log(data);
      setCityList(data);

    } catch (error) {
      console.log(error);
    }
  }

  const displayLocation = async (e) => {
    try {

      if(e.target.value === "select"){
        setSelectedCity('');
        return;
      }
      setSelectedCity(e.target.value);

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
      <div className='container'>
        <select onChange={fetchState}>
          <option value="select">Select Country</option>
        {countryList.map((countryName)=>{
          return <option value={countryName}>{countryName}</option>
        })}
        </select>

        <select onChange={fetchCity} disabled={selectedCountry === "" ? true : false}>
          <option value="select">Select State</option>
        {stateList.map((stateName)=>{
          return <option value={stateName}>{stateName}</option>
        })}
        </select>

        <select disabled={selectedState === "" ? true : false} onChange={displayLocation}>
          <option value="select">Select City</option>
        {cityList.map((cityName)=>{
          return <option value={cityName}>{cityName}</option>
        })}
        </select>

      </div>
        {selectedCity && 
          <span className='location'><b>You selected </b><strong>{selectedCity},</strong> <span> {selectedState}, {selectedCountry}</span></span>
          // <span>You Selected {selectedCity}, {selectedState}, {selectedCountry}</span>
        }
    </div>
  );
}

export default App;
