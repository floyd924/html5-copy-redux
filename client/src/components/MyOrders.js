import React, {Component} from 'react';
import {connect} from "react-redux";
import { getMyOrders } from '../actions/index.js';


const mapStateToProps = state => ({ myOrders: state.myOrders, user: state.user})



const mapDispatchToProps = dispatch => ({getMyOrders: name => dispatch(getMyOrders(name))})


class MyOrders extends Component{

    constructor(props){
        super(props);
        //should i put this in 'componentDidMount?'
        this.getInitialData();    
    }

    getInitialData = function(){
        this.props.getMyOrders("iain");
    }

    getData = function(){
        let userName = this.props.user[0];
        console.log(userName)
         this.props.getMyOrders(userName);

    };

    componentDidUpdate(prevProps){
        console.log("myOrders did update")
        if (this.props.myOrders != prevProps.myOrders) {
            console.log("no match");
            console.log(this.props.user[0])
            console.log("this.props.myorders:", this.props.myOrders);
            console.log("prevprops.myOrders", prevProps.myOrders)
            //this.getData(this.props.user[0])
        }   
    }
    

    render(){
        return(
            <div className="my-orders-container">
                <h1>all my orders go here</h1>
                <h3>{this.props.user[0]}</h3>
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
                            {this.props.myOrders ? this.props.myOrders.map((order, index) => {
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
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);