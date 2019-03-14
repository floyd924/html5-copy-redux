import React, {Component} from 'react';
import { connect } from "react-redux";
import { getPendingOrders } from '../../actions/index.js';
import openSocket from 'socket.io-client';

const mapStateToProps = state => ({ pendingOrders: state.pendingOrders });

const mapDispatchToProps = dispatch => ({ 
    getPendingOrders: (data) => dispatch(getPendingOrders(data)) 
})

class OrderBook extends Component{

    constructor(props){
        super(props);
        const that = this;
        this.socket = openSocket('http://localhost:3001');
        this.socket.on('receiveOrderData', function(data){
            console.log('order data received in the front end', data)
            that.dispatchStuff(data)
        })
        this.getData();
    }

    getData (){
        this.socket.emit('getPendingOrders')
    }

    dispatchStuff (data) {
        console.log("dispatching to getPendingOrders", data)
        this.props.getPendingOrders(data)
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