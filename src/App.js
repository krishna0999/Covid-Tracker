import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select, MenuItem, Card, CardContent } from "@mui/material";
import { data } from "autoprefixer";
import Infobox from "./Components/Infobox";
import Map from "./Components/Map";
import Table from "./Components/Table"
import { printStat, sortData } from "./utils"
import LineGraph from "./Components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) =>
        response.json().then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          console.log("Data >>>>", data);
          const sortedData = sortData(data)
          setMapCountries(sortedData);
          setTableData(sortedData);
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
      getCountryCode === "worldwide"
          ? setMapCenter([20.5937, 78.9629 ])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    })

    
  };



  return (
    <div className="app flex justify-evenly p-6"> 
    {/* responsiveness for smaller devices has to be added here */}
      <div className="app__left">
        <div className="app__header flex justify-between items-center mb-2">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono">COVID-19 Tracker</h1>
            <div className="underline"></div>
          </div>
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
        <div className="app__info-boxes mt-6 flex justify-between">
          <Infobox isRed onClick={(e) => setCasesType('cases')} title="Coronavirus cases" cases={printStat(countryInfo.todayCases)} total={printStat(countryInfo.cases)} />
          <Infobox isGreen onClick={(e) => setCasesType('recovered')} title="Recoveries" cases={printStat(countryInfo.todayRecovered)} total={printStat(countryInfo.recovered)} />
          <Infobox isRed onClick={(e) => setCasesType('deaths')} title="Deaths" cases={printStat(countryInfo.todayDeaths)} total={printStat(countryInfo.deaths)} />
        </div>
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>

      

      <Card className="app__right">
        <CardContent>
        <h1 className="font-bold text-2xl">
          Live cases by country
        </h1>
          <Table tableData={tableData}/>
        <h1 className="font-bold text-2xl mt-4">
          {/* <div className="h-1 w-92 bg-blue-900"></div> */}
          Worldwide new {casesType}
        </h1>
        <LineGraph casesType={casesType} />
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
