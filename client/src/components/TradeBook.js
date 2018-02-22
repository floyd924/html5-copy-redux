import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class TradeBook extends Component {
    render() {
        const {
            tradeBook,
            marketAverage,
        } = this.props;
        
        const listTrades = tradeBook.map((trade) =>
            <div key={`${(trade.timeStamp + "" + trade.sellOrderId + "" + trade.buyOrderId)}`} className={`row noListStyle ${trade.quantity} listItem-${trade.price < marketAverage ? 'belowMV' : 'aboveMV' }`}>
                <li>
                <div className={`listItem listItem-quantity col-xs-2`}>{trade.quantity.toFixed(7)}</div>
                <div className="listItem listItem-price col-xs-2">£{trade.price.toFixed(2)}</div>
                <div className="listItem listItem-timestamp col-xs-4">{moment(trade.timeStamp).format('h:mm:ss, ddd, MMM')}</div>
                <div className="listItem listItem-accountTo col-xs-2">{trade.accountTo}</div>
                <div className="listItem listItem-accountFrom col-xs-2">{trade.accountFrom}</div></li>
            </div>
        );

        return (
            <div className="tradeBook">
                <h2>Trade History</h2>
                    <div className="row">
                        <div className="col-xs-2"><span>Trade size</span></div>
                        <div className="col-xs-2"><span>Price</span></div>
                        <div className="col-xs-4"><span>Time</span></div>
                        <div className="col-xs-2"><span>Account To</span></div>
                        <div className="col-xs-2"><span>Account From</span></div>
                    </div>
                <ul>
                    {listTrades}
                </ul>
            </div>
        )
    }
}

TradeBook.propTypes = {
    tradeBook: PropTypes.array.isRequired,
};

export default TradeBook;