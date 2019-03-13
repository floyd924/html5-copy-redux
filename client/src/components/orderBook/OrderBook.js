import React, {Component} from 'react';
import { connect } from "react-redux";
import { getPendingOrders } from '../../actions/index.js';
import openSocket from 'socket.io-client';

const mapStateToProps = state => ({ pendingOrders: state.pendingOrders });

const mapDispatchToProps = dispatch => ({ getPendingOrders: () => dispatch(getPendingOrders()) })

class OrderBook extends Component{

    constructor(props){
        super(props);
        this.socket = openSocket('http://localhost:3001');
        this.getData();
    }

    getData (){
        (this.props.getPendingOrders());
        this.socket.emit('getPendingOrders')
    }

    render(){
        return(
            <div className="order-book-container">
                <h1>Order Book</h1>
                <div className="table-wrapper-scroll-y">
                    <table id="pending-sells">
                        <thead>
                            <tr>
                                <th scope="col">Action</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.pendingOrders ? this.props.pendingOrders.filter(x => x.action ==="SELL").map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{order.action}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price}</td>
                                    </tr>
                                )
                            }): null }
                        </tbody>
                    </table>
                </div>
                <br />
                <br />
                <div className="table-wrapper-scroll-y">
                    <table id="pending-buys">
                        <thead>
                            <tr>
                                <th scope="col">Action</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.pendingOrders.filter(x => x.action === "BUY").map((order, index) => {
                                return (
                                    <tr key={index}>
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