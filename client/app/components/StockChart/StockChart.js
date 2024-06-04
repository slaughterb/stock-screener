import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ReactApexChart from 'react-apexcharts';

class StockChart extends Component {

    constructor(props) {
        super(props);
    }

    // creating options and series for apex chart:
    options = {
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: 'Candle Chart (Daily)',
            align: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    };

    getSeriesData = (candles) => {
        const res = [];
        for (let i = 0; i < candles.length; i++) {
            const dataPoint = {
                x: candles[i]['date'],
                y: [candles[i]['open'], candles[i]['high'], candles[i]['low'], candles[i]['close']],
            };
            res.push(dataPoint);
        }
        return res;
    }

    seriesData = this.getSeriesData(this.props.candles);

    series = [{
        data: this.seriesData
    }];

    render() {
        return (
            <div id="chart-container">
                <div id="chart">
                    <ReactApexChart options={this.options} series={this.series} type="candlestick" height={350} />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}

export default StockChart;


    
