import React, { Component} from 'react';
import { postNewOrder } from '../actions/index.js';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return { orders: state.orders };
    //come back and check this line if not working
};

function mapDispatchToProps(dispatch){
    return {
        postNewOrder: order => dispatch(postNewOrder(order))
    }
}

class Form extends Component {

    constructor(props){
        super(props);
        this.state = {
            account: "TEST",
            quantity: null,
            price: null,
            action: null
        }
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleButtonSelect = this.handleButtonSelect.bind(this);
    }




    handleButtonClick(event){
       // send a post request using local state
        if (this.state.quantity && this.state.price && this.state.action) {
            this.props.postNewOrder(this.state)
        }
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