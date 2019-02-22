import React, { Component} from 'react';

class Pracs extends Component {
    render(){
        return(
            <div className="pracs-container">

                <h2>Recent Completed Trades</h2>


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
            
            
                        <button type="button" class="btn btn-info">Submit Order</button>
            
                    </form>
            </div>
        )
    }
}

export default Pracs;