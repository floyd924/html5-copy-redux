import React, {Component} from 'react';
import { getBitCoinApi } from '../sagas';

class CurrentLivePrice extends Component {
    render() {
        const {
            bitCoinLastUpdated,
            bitCoinEURRate,
            bitCoinGBPRate,
            bitCoinUSDRate,
            requestBitCoinApi,
        } = this.props;

        return (
            <div className="currentLivePrice">
                <h2>Current Bit Coin Prices</h2>
                <div className="col-lg-10">
                    <div> 
                        <span>Last Updated at: {bitCoinLastUpdated} </span>
                        <button onClick={() => {requestBitCoinApi(true)}}>
                            Quick Refresh
                        </button>
                    </div>
                    <div>
                        <span className="col-lg-12">EUR: €{bitCoinEURRate}</span>
                        <span className="col-lg-12">GBP: £{bitCoinGBPRate}</span>
                        <span className="col-lg-12">USD: ${bitCoinUSDRate}</span>
                    </div>
                </div>

            </div>
        )
    }
}

export default CurrentLivePrice;