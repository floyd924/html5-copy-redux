import React, {Component} from 'react';
import { connect } from "react-redux";
import { getPendingOrders } from '../actions/index.js';

const mapStateToProps = state => ({ pendingOrders: state.pendingOrders });

const mapDispatchToProps = dispatch => ({ getPendingOrders: () => dispatch(getPendingOrders()) })

class OrderBook extends Component{

    constructor(props){
        super(props);
        //should i put this in 'componentDidMount?'
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
                            {this.props.pendingOrders ? this.props.pendingOrders.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{order.account}</td>
                                        <td>{order.action}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price}</td>
                                    </tr>
                                )
                            }): null }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);