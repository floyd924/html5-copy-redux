import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';
import OrderBookContainer from '../containers/OrderBookContainer';
import TradeBookContainer from '../containers/TradeBookContainer';
import OrderFormContainer from '../containers/OrderFormContainer';
import PriceChartContainer from '../containers/PriceChartContainer';
import CurrentLivePrice from './CurrentLivePrice';

import '../styles/App.css';
import '../styles/OrderBook.css';
import '../styles/OrderForm.css';
import '../styles/PriceChartSVG.css';

class App extends Component {
    render() {
        const {
            name,
            accountId,
            allAccounts,
            selectedAction,
            orderBook,
            tradeBook,
            marketAverage,
            togglePrivate,
            viewPrivate,
            privateOrderBook,
            windowResized,
        } = this.props;
        return (
            <div className="App">
                <div className="row">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to React {name}</h2>
                    </div>
                    <div className="App-body fill">
                        <div className="panel OrderFormContainer col-xs-12 col-md-6 col-lg-2">
                            <OrderFormContainer allAccounts={allAccounts} selectedAction={selectedAction} />
                        </div>
                        <div className="panel OrderBookContainer col-xs-12 col-md-5 col-lg-2">
                            <OrderBookContainer privateOrderBook={privateOrderBook} accountId={accountId} togglePrivate={togglePrivate} viewPrivate={viewPrivate} orderBook={orderBook} />
                        </div>
                        { orderBook.length > 0 &&
                            <div className="panel PriceChartContainer col-xs-12 col-md-6 col-lg-4">
                                <PriceChartContainer windowResized={windowResized} orderBook={orderBook} />
                            </div>
                        }
                        <div className="panel TradeBookContainer col-xs-12 col-md-5 col-lg-4">
                            <TradeBookContainer marketAverage={marketAverage} tradeBook={tradeBook} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="panel col-xs-12 col-md-6 col-lg-2">
                        <CurrentLivePrice />
                    </div>
                </div>
            </div>
        )
    }
}

App.propTypes = {
    name: PropTypes.string.isRequired,
    accountId: PropTypes.number.isRequired,
    allAccounts: PropTypes.array.isRequired,
    changeAccount: PropTypes.func,
    changeActionType: PropTypes.func,
    selectedAction: PropTypes.string,
    orderBook: PropTypes.array.isRequired,
    tradeBook: PropTypes.array.isRequired,
    marketAverage: PropTypes.number.isRequired,
    viewPrivate: PropTypes.bool.isRequired,
};

export default App;