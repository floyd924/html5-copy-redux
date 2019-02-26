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
    }




    buttonClicked(){
        console.log("submit called");
        //manually create a new post request with hard coded data and try and amke it work
    }

    render(){
        return(
            <div className="pracs-container">

                <h2>Add a new trade</h2>


                <form id="input-form">
            
            
            
                        <div class="form-item d-inline">

                            <label for="quantity">Quantity:</label>
                            <input id="quantity" type="number" min="0" />
                        </div>
            
                        <div class="form-item d-inline">

                            <label for="price">Price:</label>
                            <input id="price" type="number" min="0" step="0.01" />
                        </div>
            
                        <div class="form-item">
                            <fieldset>
                                <legend>Action:</legend>
                                <input type="radio" id="action" name="action" value="BUY" />
                                <label for="BUY">Buy</label>
                                <input type="radio" id="action" name="action" value="SELL" />
                                <label for="SELL">Sell</label>
                            </fieldset>
                        </div>
            
            
                        <button onclick={this.buttonClicked} type="button" class="btn btn-info">Submit Order</button>
            
                    </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);