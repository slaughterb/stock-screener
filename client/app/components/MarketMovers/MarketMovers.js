
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './styles.css';


class MarketMovers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topGainers: [],
            topDecliners: [],
            error: null
        };

        this.queryTopGainers = this.queryTopGainers.bind(this);
        this.queryTopDecliners = this.queryTopDecliners.bind(this);
    }

    queryTopGainers = () => {
        fetch('/api/stock/top-gainers', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((json) => {
            if (json.success) {
                this.setState({
                    topGainers: json.topGainers[0]
                });
            }
            else {
                this.setState({
                    error: json.message
                });
            }
        }).catch((err) => {
            this.setState({
                error: err,
                topGainers: []
            });
        });
    }

    queryTopDecliners = () => {
        fetch('/api/stock/top-decliners', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((json) => {
            if (json.success) {
                this.setState({
                    topDecliners: json.topDecliners[0]
                });
            }
            else {
                this.setState({
                    error: json.message
                });
            }
        }).catch((err) => {
            this.setState({
                error: err,
                topDecliners: []
            });
        });
    }


    render() {
        return (
            <div className="marketMoversContainer">
                <h3 className="center">Top Market Movers</h3>
                <div className="topMoversContainer">
                    <div className="halfCol inline">
                        <div>
                            <button onClick={this.queryTopGainers} className="fmpTopGainers">Show Top Stock Gainers</button>
                        </div>
                        <div>
                            {this.state.topGainers.length !== 0 ? (
                                <table className="gainersTable">
                                    <thead>
                                        <tr>
                                            <th>Symbol</th>
                                            <th>Price</th>
                                            <th>Percent Gain</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.topGainers.map((gainer, i) => (
                                            <tr key={uuidv4()}>
                                                <td>${gainer.symbol}</td>
                                                <td>${gainer.price}</td>
                                                <td>+{gainer.changesPercentage}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : null}
                        </div>
                    </div>
                    <div className="halfCol inline">
                        <div>
                            <button onClick={this.queryTopDecliners} className="fmpTopDecliners">Show Top Decliners</button>
                        </div>
                        <div>
                            {this.state.topDecliners.length !== 0 ? (
                                <table className="declinersTable">
                                    <thead>
                                        <tr>
                                            <th>Symbol</th>
                                            <th>Price</th>
                                            <th>Percent Loss</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.topDecliners.map((decliner, i) => (
                                            <tr key={uuidv4()}>
                                                <td>${decliner.symbol}</td>
                                                <td>${decliner.price}</td>
                                                <td>{decliner.changesPercentage}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MarketMovers;