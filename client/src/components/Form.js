import React, { Component} from 'react';
import { postNewOrder } from '../Actions/index.js';
import { connect } from "react-redux";
import { getTrades } from '../Actions/index.js';
import { getMyOrders } from '../Actions/index.js';
import { getPendingOrders } from '../Actions/index.js';

const mapStateToProps = state => ({ orders: state.orders, user: state.user})

const mapDispatchToProps = dispatch => ({
    postNewOrder: order => dispatch(postNewOrder(order)),
    getTrades: () => dispatch(getTrades()),
    getMyOrders: name => dispatch(getMyOrders(name)),
    getPendingOrders: () => dispatch(getPendingOrders())
})

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
        this.componentDidMount = this.componentDidMount.bind(this);

    }

    componentDidMount(){
        console.log("component did mount!");
        this.setState({ account: this.props.user[0]});
    }




    //we want to call each getter method from here, using the current state
    handleButtonClick(event){
        let tempName = this.props.user[0]; //"iain"
        this.setState({ account: tempName }); //does not seem to work!
        const newOrder = {
            account: tempName,
            quantity: this.state.quantity,
            price: this.state.price,
            action: this.state.action
        }
        if (this.state.quantity && this.state.price && this.state.action) {
            this.props.postNewOrder(newOrder)
            .then(() => this.refreshAllComponents(newOrder))
            // .then(this.timer(newOrder));
        }
    }

    // timer = (newOrder) => {
    //     setTimeout(() => {
    //         this.refreshAllComponents(newOrder)
    //     }, 10);
    // }

    refreshAllComponents = function(newOrder){
        this.props.getPendingOrders()
        //window.alert("Your trade has been accepted")
        this.props.getMyOrders(newOrder.account)
        this.props.getTrades()
        this.refreshThisComponent(newOrder)
    }

    refreshThisComponent = function(newOrder){
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