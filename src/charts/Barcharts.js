import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 200],
  ["2018", 370, 460, 350],
  ["2020", 460, 1220, 320],
  ["2021", 1230, 240, 250],
];

export const options = {
  chart: {
    title: "Device Usage",
    subtitle: "Bulb, Tubelight, and Striplight: 2014-2017",
  },
  colors: ["#f49701", "rgb(37,11,165)", "#188310"],
};

export default function BarChart() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="350px"
      data={data}
      options={options}
    />
  );
}
