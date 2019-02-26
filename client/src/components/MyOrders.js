import React, {Component} from 'react';
import { getMyOrders } from '../actions/index.js';
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return { orders: state.orders };
};

//not using this yet

function mapDispatchToProps(dispatch){
    return {
        getMyOrders: article => dispatch(getMyOrders())
    }
}


class MyOrders extends Component{

    constructor(props){
        super(props);
        this.state = {
            myOrders: []
        };
        this.getData();
    }

    getData = function(){
        this.props.getMyOrders().then(data => this.setState({myOrders: data}));
    };

    render(){
        return(
            <div className="my-orders-container">
                <h1>all my orders go here</h1>
                <div class="table-wrapper-scroll-y">
                    <table class="table table-dark table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Action</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.myOrders.map((order) => {
                                return (
                                    <tr>
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


// export default MyOrders;
//need this last line to recognise the function 'getMyOrders'
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);