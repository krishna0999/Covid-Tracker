import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { numeral } from "numeral";
import Chart from 'chart.js/auto'

const options = {
    legend: {
        display: true,
      },
  elements: {
    points: {
      radius: 5,
    },
  },
  maintainAspectRatio: true,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YYYY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const caseTypeColors = {
  cases: {
      hex: "#CC1034",
      border: "#cc5a70",
      multiplier: 800,
  },
  recovered: {
      hex: "#a5db6b",
      border: "#00c210",
      multiplier: 1200,
  },
  deaths: {
      hex: "#fb4443",
      border: "#fc9695",
      multiplier: 2000,
  }
}

const buildChartData = (data, casesType = "cases") => {
  console.log(data[casesType]);
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    } else {
      const newDataPoint = {
        x: date,
        y: [1,2,3,4,4,5,5,67,7,8,8,6,6,4,3,3,3,3,4,4,4],
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }

  return chartData;
};

function LineGraph( { casesType= "cases", } ) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
      )
        .then((response) => response.json())
        .then((data) => {
          const chartData = buildChartData(data, casesType);
          setData(chartData, casesType);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div className="flex flex-grow">
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                data: data,
                borderColor: caseTypeColors[casesType].border,
                backgroundColor: caseTypeColors[casesType].hex,
                fill: true,
                tension: 0.1,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

// https://disease.sh/v3/covid-19/v3/covid-19/historical/all?lastdays=120
export default LineGraph;
