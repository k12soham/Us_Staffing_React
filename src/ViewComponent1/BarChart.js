// import React from "react";
// import ReactModal from 'react-modal';
// // import { Histogram } from "perf_hooks";
// import Histogram from 'react-chart-histogram';

// function BarChart(){
//     const labels = ['2016', '2017', '2018'];
//   const data = [324, 45, 672];

//   const options = { fillColor: 'blue', strokeColor: 'red' };
//   const options2 = { fillColor: 'red', strokeColor: 'yellow' };
//     return(
//         <div className="App">
// 	<h1>GEEKSFORGEEKS BAR CHART REACTJS</h1>
//     <Histogram
//           xLabels={labels}
//           yValues={data}
//           width='400'
//           height='200'
//           options={options2}
//       />
//         </div>
//     )
// }

// export default BarChart;


import React from "react";
import ReactModal from 'react-modal';
import { Bar } from "react-chartjs-2";

function BarChart() {
return (
	<div className="App">
	<h1>GEEKSFORGEEKS BAR CHART REACTJS</h1>
	<div style={{ maxWidth: "650px" }}>
		<Bar
		data={{
			// Name of the variables on x-axies for each bar
			labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
			datasets: [
			{
				// Label for bars
				label: "total count/value",
				// Data or value of your each variable
				data: [1552, 1319, 613, 1400],
				// Color of each bar
				backgroundColor: ["aqua", "green", "red", "yellow"],
				// Border color of each bar
				borderColor: ["aqua", "green", "red", "yellow"],
				borderWidth: 0.5,
			},
			],
		}}
		// Height of graph
		height={400}
		options={{
			maintainAspectRatio: false,
			scales: {
			yAxes: [
				{
				ticks: {
					// The y-axis value will start from zero
					beginAtZero: true,
				},
				},
			],
			},
			legend: {
			labels: {
				fontSize: 15,
			},
			},
		}}
		/>
	</div>
	</div>
);
}

export default BarChart;
