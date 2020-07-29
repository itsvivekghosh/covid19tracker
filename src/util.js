import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import React from "react";

const casesTypeColors = {
  cases: {
    color: "red",
    hex: "#CC1034",
    multiplier: 500,
  },

  recovered: {
    color: "green",
    hex: "#7dd71d",
    multiplier: 800,
  },

  deaths: {
    color: "black",
    hex: "#fb4443",
    multiplier: 1200,
  },
};

export const prettyPrintStat = (stat) => {
  return stat
    ? `${numeral(stat).format("+0.0a")}`
    : `${numeral(stat).format("+0a")}`;
};

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// Draw circles on Map
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={"transparent"}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          />
          <h3 className="info-name">{country.country}</h3>
          <div className="info-confirm">
            Total Cases: {numeral(country.cases).format("+0")}
          </div>
          <div className="info-recovered">
            Total Recovered: {numeral(country.recovered).format("+0")}
          </div>
          <div className="info-deaths">
            Total Deaths: {numeral(country.deaths).format("+0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
