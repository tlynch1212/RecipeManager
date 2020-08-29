import React from 'react'
import {Bar} from 'react-chartjs-2';

const BarChart = (props) => {

    var GenerateColor = () => {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
     };
     let colors = props.data.dataSets[0].data.map(t => {
         return GenerateColor();
     });
    let data = {
        labels: props.data.dataSets[0].labels,
        datasets: [{
            label: props.data.title,
            backgroundColor: colors,
            data: props.data.dataSets[0].data
        }]
    }

    return (
        <Bar data={data} />
    );
}

export default BarChart;