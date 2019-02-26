import React, {Component} from 'react';
import {connect} from "react-redux";
import { getMyOrders } from '../actions/index.js';

const mapStateToProps = (state) => {
    return { myOrders: state.myOrders };
};

//why 'order'?
function mapDispatchToProps(dispatch){
    return {
        getMyOrders: order => dispatch(getMyOrders())
    }
}


class MyOrders extends Component{

    constructor(props){
        super(props);
        this.getData();
    }

    getData = function(){
        this.props.getMyOrders();
    };

    render(){
        return(
            <div className="my-orders-container">
                <h1>all my orders go here</h1>
                <div className="table-wrapper-scroll-y">
                    <table className="table table-dark table-striped table-bordered">
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