import React, {Component} from 'react';
import {connect} from "react-redux";
import { getMyOrders } from '../../actions/index.js';
import openSocket from 'socket.io-client';


const mapStateToProps = state => ({ myOrders: state.myOrders, user: state.user })



const mapDispatchToProps = dispatch => ({ getMyOrders: name => dispatch(getMyOrders(name)) })


class MyOrders extends Component{

    constructor(props){
        super(props);
        this.socket = openSocket('http://localhost:3001');
        this.getInitialData();    
    }

    getInitialData (){
        this.props.getMyOrders("iain");
        this.socket.emit('getMyOrders');
    }


    // Do i actually use this method at all?
    // getData (){
    //     const userName = this.props.user;
    //     this.props.getMyOrders(userName);

    // }
    

    render(){
        return(
            <div className="my-orders-container">
                <h1>My Orders</h1>
                <p>Signed in as:</p><h3>{this.props.user}</h3>
                <div className="table-wrapper-scroll-y">
                    <table id="my-orders-table">
                        <thead>
                            <tr>
                                <th scope="col">Action</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.myOrders.map((order, index) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);