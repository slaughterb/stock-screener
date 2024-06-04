
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import StockQuote from '../StockQuote/StockQuote';
import MarketMovers from '../MarketMovers/MarketMovers';
import SectorOverview from '../SectorOverview/SectorOverview';

import './styles.css';


class FinancialModel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null
        };

    }

    render() {
        return (
            <div className="pageContainer">
                <h1>Financial Model Screener</h1>
                <p>This portion of the application serves as both a stock lookup resource and a screener to gather lists of stocks that match
                specific criteria using the Financial Model Prep API. There is a daily limit rate of 250 requests through FMP's free tier.</p>

                <StockQuote />

                <p>Additionally, take a look at some overarching market insights from FMP and observe recent sector performance / significant market movers
                based on the criteria below: </p>
                <SectorOverview />
                <MarketMovers />
            </div>
        );
    }
}

export default FinancialModel;