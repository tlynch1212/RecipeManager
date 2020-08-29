import React from 'react'
import {Pie} from 'react-chartjs-2';

const PieChart = (props) => {
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
        <Pie data={data} />
    );
}

export default PieChart;