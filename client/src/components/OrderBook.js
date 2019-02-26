import React, {Component} from 'react';
import { connect } from "react-redux";
import { getPendingOrders } from '../actions/index.js';

const mapStateToProps = (state) => {
    return { pendingOrders: state.pendingOrders };
};

//what does 'order' do here?
function mapDispatchToProps(dispatch){
    return {
        getPendingOrders: order => dispatch(getPendingOrders())
    }
}

class OrderBook extends Component{

    constructor(props){
        super(props);
        this.getData();
    }

    getData = function(){
        this.props.getPendingOrders();
    };

    render(){
        return(
            <div className="order-book-container">
                <h1>here are the current pending orders</h1>
                <div className="table-wrapper-scroll-y">
                    <table className="table table-dark table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Action</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.pendingOrders.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{order.account}</td>
                                        <td>{order.action}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);