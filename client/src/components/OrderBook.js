import React, {Component} from 'react';
import PropTypes from 'prop-types';

class OrderBook extends Component {
    render() {
        const classNameCheck = action => {
            return action === 'BUY' ? 'buy' : 'sell';
        };

        const {
            orderBook,
            togglePrivate,
            viewPrivate,
            privateOrderBook,
        } = this.props;
        
        const listAggOrders = orderBook.map((order) =>
            <div key={`${order.price + "" + order.quantity + "" + order.action}`} className={`row noListStyle listItem-${classNameCheck(order.action)}`}>
                <li>
                <div className={`listItem listItem-quantity col-xs-6`}>{order.quantity.toFixed(9)}</div>
                <div className="listItem listItem-price col-xs-6">£{order.price.toFixed(2)}</div></li>
            </div>
        );

        const listPrivateOrders = privateOrderBook.map((order) =>
            <div key={`${order.price + "" + order.quantity + "" + order.action}`} className={`row noListStyle ${order.action} listItem-${classNameCheck(order.action)}`}>
                <li>
                <div className={`listItem listItem-quantity col-xs-6`}>{order.quantity.toFixed(9)}</div>
                <div className="listItem listItem-price col-xs-6">£{order.price.toFixed(2)}</div></li>
            </div>
        );

        return (
            <div className="orderBook">
                <div><h2>Order Book</h2><p onClick={() => togglePrivate(!viewPrivate)}>Displaying {viewPrivate ? 'Private' : 'aggregated'} orders</p></div>
                    <div className="row">
                        <div className="col-xs-6"><span>Market size</span></div><div className="col-xs-6"><span>Price</span></div>
                    </div>
                <ul>
                    {viewPrivate? listPrivateOrders : listAggOrders}
                </ul>
            </div>
        )
    }
}

OrderBook.propTypes = {
    orderBook: PropTypes.array.isRequired,
};

export default OrderBook;