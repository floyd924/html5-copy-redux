import React, { Component} from 'react';
import { postNewOrder } from '../actions/index.js';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return { orders: state.orders };
};

//not using this yet
function mapDispatchToProps(dispatch){
    return {
        postNewOrder: article => dispatch(postNewOrder())
    }
}

class Form extends Component {

    constructor(props){
        super(props);
        this.state = {
            account: "",
            quantity: "",
            price: "",
            action: ""
        }
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleButtonSelect = this.handleButtonSelect.bind(this);
    }




    handleButtonClick(event){
        let quantityBox = document.getElementById("quantity");
        console.log("submit state:", this.state)
        //get name on account
        //save name to local state
        //send a post request using local state
        //could hard code a post request if you need to
    }

    handleQuantityChange(event){
        this.setState({quantity: event.target.value})
    }

    handlePriceChange(event){
        this.setState({price: event.target.value})
    }

    handleButtonSelect(event){
        console.log(event.target.value);
        this.setState({action: event.target.value})
    }

    render(){
        return(
            <div className="pracs-container">

                <h2>Add a new trade</h2>


                <form id="input-form">
            
            
            
                        <div class="form-item d-inline">

                            <label for="quantity">Quantity:</label>
                            <input onChange={this.handleQuantityChange} id="quantity" type="number" min="0" />
                        </div>
            
                        <div class="form-item d-inline">

                            <label for="price">Price:</label>
                            <input onChange={this.handlePriceChange} id="price" type="number" min="0" step="0.01" />
                        </div>
            
                        <div class="form-item">
                            <fieldset>
                                <legend>Action:</legend>
                                <input onClick={this.handleButtonSelect} type="radio" id="action" name="action" value="BUY" />
                                <label for="BUY">Buy</label>
                                <input onClick={this.handleButtonSelect} type="radio" id="action" name="action" value="SELL" />
                                <label for="SELL">Sell</label>
                            </fieldset>
                        </div>
            
            
                        <button onClick={this.handleButtonClick} type="button" class="btn btn-info">Submit Order</button>
            
                    </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);