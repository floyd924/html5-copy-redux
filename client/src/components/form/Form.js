import React, { Component} from 'react';
import { postNewOrder } from '../../actions/index.js';
import { connect } from "react-redux";
import { getTrades } from '../../actions/index.js';
import { getMyOrders } from '../../actions/index.js';
import { getPendingOrders } from '../../actions/index.js';
import {getMarketDepth} from '../../actions/index.js';
import openSocket from 'socket.io-client';

const mapStateToProps = state => ({ orders: state.orders, user: state.user})

const mapDispatchToProps = dispatch => ({
    postNewOrder: order => dispatch(postNewOrder(order)),
    getTrades: () => dispatch(getTrades()),
    getMyOrders: name => dispatch(getMyOrders(name)),
    getPendingOrders: () => dispatch(getPendingOrders()),
    getMarketDepth: () => dispatch(getMarketDepth())
})

class Form extends Component {

    constructor(props){
        super(props);
        this.state = {
            account: this.props.user,
            quantity: null,
            price: null,
            action: null
        }
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleButtonSelect = this.handleButtonSelect.bind(this);
        this.refreshThisComponent = this.refreshThisComponent.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        
        this.socket = openSocket('http://localhost:3001');
    }

    componentDidMount(){
        this.setState({ account: this.props.user});
    }



    //we want to call each getter method from here, using the current state
    handleButtonClick(){
        const tempName = this.props.user;
        this.setState({ account: tempName });
        const newOrder = {
            account: tempName,
            quantity: parseInt(this.state.quantity), //may need to ParseFloat instead if I want to include decimal points
            price: parseInt(this.state.price), //may need to use parseFloat
            action: this.state.action
        }
        if (this.state.quantity && this.state.price && this.state.action) {
            this.props.postNewOrder(newOrder)
                .then(() => this.refreshAllComponents(newOrder))
            
        
            this.socket.emit('newOrder', {newOrder})

        }
    }

    refreshAllComponents(newOrder){
        this.props.getPendingOrders()
        window.alert("Your trade has been accepted")
        this.props.getMyOrders(newOrder.account)
        this.props.getTrades()
        this.props.getMarketDepth();
        this.refreshThisComponent(newOrder)
    }

    refreshThisComponent(newOrder){
        this.setState(
            {
                account: newOrder.account,
                quantity: null,
                price: null,
                action: null
            })
        document.getElementById("input-form").reset();
    }

    handleQuantityChange(event){
        this.setState({quantity: event.target.value})
    }

    handlePriceChange(event){
        this.setState({price: event.target.value})
    }

    handleButtonSelect(event){
        this.setState({action: event.target.value})
    }

    render(){
        return(
            <div className="pracs-container">

                <h2>Add a new trade</h2>


                <form id="input-form">
            
            
            
                    <div className="form-item d-inline">

                        <label htmlFor="quantity">Quantity:</label>
                        <input onChange={this.handleQuantityChange} id="quantity" type="number" min="0" />
                    </div>
                    <br />
                    <div className="form-item d-inline">

                        <label htmlFor="price">Price:</label>
                        <input onChange={this.handlePriceChange} id="price" type="number" min="0" step="0.01" />
                    </div>
            
                    <div className="form-item">
                        <fieldset>
                            <legend>Action:</legend>
                            <input onClick={this.handleButtonSelect} type="radio" id="action" name="action" value="BUY" />
                            <label htmlFor="BUY">Buy</label>
                            <input onClick={this.handleButtonSelect} type="radio" id="action" name="action" value="SELL" />
                            <label htmlFor="SELL">Sell</label>
                        </fieldset>
                    </div>
            
            
                    <button onClick={this.handleButtonClick} type="button" className="btn btn-info">Submit Order</button>
            
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);