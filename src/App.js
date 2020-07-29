import { useState, useEffect } from "react";
import React from "react";
import {
  Select,
  FormControl,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map.js";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import { prettyPrintStat as pretty } from "./util";

function App() {
  // State = How to write a variable in react
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80234,
    lng: -40.3534,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    // World Wide Default while loading for first time...
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    // The Code pulls info from API
    // async -> send a request to the server and pulls info

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData(); // Calling the countries to get async call from API
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    // https://disease.sh/v3/covid-19/all -- for WorldWide
    // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]  --for specific Country

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        console.log(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="App">
      <div className="app__left">
        {/* Header Begins */}
        <div className="app__header">
          <h1>COVID19 Tracker</h1>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">World Wide</MenuItem>
              {/* Loop through all the countries */}

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* Header Ends */}
        {/* Title + Select Input Dropdown field */}
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            total={pretty(countryInfo.cases)}
            cases={pretty(countryInfo.todayCases)}
          ></InfoBox>
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recoveries"
            total={pretty(countryInfo.recovered)}
            cases={pretty(countryInfo.todayRecovered)}
          ></InfoBox>
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            total={pretty(countryInfo.deaths)}
            cases={pretty(countryInfo.todayDeaths)}
          ></InfoBox>
        </div>
        {/* Table */}
        {/* Graph */}
        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        />
        {/* Map */}
        {/* Footer */}
      </div>

      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}></Table>
            {/* Table */}
            <h3>World Wide Cases</h3>
            <LineGraph />
            {/* Graph */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
