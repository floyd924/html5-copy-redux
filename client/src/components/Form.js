import React, { Component} from 'react';
import { postNewOrder } from '../actions/index.js';
import { connect } from "react-redux";
import { getTrades } from '../actions/index.js';
import { getMyOrders } from '../actions/index.js';
import { getPendingOrders } from '../actions/index.js';


const mapStateToProps = (state) => {
    return { 
        orders: state.orders,
        user: state.user 
    };
};

function mapDispatchToProps(dispatch){
    return {
        postNewOrder: order => dispatch(postNewOrder(order)),
        getTrades: trade => dispatch(getTrades()),
        getMyOrders: name => dispatch(getMyOrders(name)),
        getPendingOrders: order => dispatch(getPendingOrders())
    }
}

class Form extends Component {

    constructor(props){
        super(props);
        this.state = {
            account: this.props.user[0],
            quantity: null,
            price: null,
            action: null
        }
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleButtonSelect = this.handleButtonSelect.bind(this);
        this.refreshThisComponent = this.refreshThisComponent.bind(this);
    }



    //at the momoent the whole page reloads and resets to default...
    //instead we want to call each getter method from here, using the current state
    handleButtonClick(event){
        if (this.state.quantity && this.state.price && this.state.action) {
            console.log("button clicked")
            this.props.postNewOrder(this.state)
            .then(this.props.getMyOrders(this.state.account))
            .then(this.props.getTrades())
            .then(this.props.getPendingOrders())
            .then(this.refreshThisComponent())
            // .then(this.render);
        }
    }

    refreshThisComponent = function(){
        this.setState(
            {
                account: this.props.user[0],
                quantity: null,
                price: null,
                action: null
            })
        console.log("here is the new state", this.state);
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