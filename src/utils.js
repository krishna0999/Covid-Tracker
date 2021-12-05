import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import "./Map.css"

const caseTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    }
}

export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1))
    //     if(a.cases > b.cases){
    //         return -1;
    //     } else {
    //         return 1;
    //     }
    // })
    // return sortedData;
}

export const printStat = (stat) => 
stat ? `+ ${numeral(stat).format("0,0")}` : "+ 0"

export const showDataOnMap = (data, casesType) => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color= {caseTypeColors[casesType].hex}
            // fillColor={caseTypeColors[casesType].hex} 
            // have to change the color type for recovered
            radius={Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier/4}
        >
            <Popup>
                <div className="info-country">
                    <div className="info-flag" style={{backgroundImage: `url(${country.countryInfo.flag})` }}/>
                    <div className="info-name">{country.country}</div>
                    <div className="info-cases">Cases : {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered : {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths : {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
);