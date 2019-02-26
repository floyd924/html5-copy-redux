import React, {Component} from 'react';
import { getPendingOrders } from '../actions/index.js';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return { orders: state.orders };
};

//not using this yet
function mapDispatchToProps(dispatch){
    return {
        getPendingOrders: article => dispatch(getPendingOrders())
    }
}

class OrderBook extends Component{

    constructor(props){
        super(props);
        this.state = {
            allOrders: []
        };
        this.getData();
    }

    getData = function(){
        this.props.getPendingOrders().then(data => this.setState({ allOrders: data}));
    };

    render(){
        return(
            <div className="order-book-container">
                <h1>here are the current pending orders</h1>
                <div class="table-wrapper-scroll-y">
                    <table class="table table-dark table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Action</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allOrders.map((order) => {
                                return (
                                    <tr>
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