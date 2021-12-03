import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select, MenuItem, Card, CardContent } from "@mui/material";
import { data } from "autoprefixer";
import Infobox from "./Components/Infobox";
import Map from "./Components/Map";
import Table from "./Components/Table"

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) =>
        response.json().then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          console.log("Data >>>>", data);
          setTableData(data);
          setCountries(countries);
        })
      );
    };
    getCountriesData();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then(data =>{
      setCountryInfo(data);
    })
  }, [])

  const onCountryChange = async (event) => {
    const getCountryCode = event.target.value;

    const url = getCountryCode === 'worldwide' ?
    'https://disease.sh/v3/covid-19/all' :
    `https://disease.sh/v3/covid-19/countries/${getCountryCode}`

    await fetch(url).then((response) => response.json())
    .then(data => {
      setCountry(getCountryCode)
      setCountryInfo(data)
    })

    
  };



  return (
    <div className="app flex justify-evenly p-6 "> 
    {/* responsiveness for smaller devices has to be added here */}
      <div className="app__left">
        <div className="app__header flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__info-boxes flex justify-between">
          <Infobox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <Infobox title="Recoveries" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <Infobox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <Map />
      </div>

      

      <Card className="app__right">
        <CardContent>
        <h1 className="font-bold text-2xl">
          Live cases by country
        </h1>
          <Table tableData={tableData}/>
        <h1 className="font-bold text-2xl">
          Worldwide new cases
        </h1>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
