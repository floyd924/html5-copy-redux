import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';

const BUY_COLOUR = "btn btn-success";
const SELL_COLOUR = "btn btn-warning";
const DEFAULT_COLOUR = "btn btn-default";
const BUY = 'BUY';
const SELL = 'SELL';

let SubmitOrderForm = props => {
  const { handleSubmit } = props

  const calculateColour = (passColour, failColour) => {
    return props.selectedAction === BUY ? passColour : failColour;
  }

  return (
      <div>
        <button
          className={`${calculateColour(BUY_COLOUR, DEFAULT_COLOUR)} orderForm-button`}
          onClick={() => props.changeActionType(BUY)}>
            BUY
        </button>
        <button 
          className={`${calculateColour(DEFAULT_COLOUR, SELL_COLOUR)} orderForm-button`}
          onClick={() => props.changeActionType(SELL)}>
            SELL
        </button>
        <form onSubmit={handleSubmit}>
          <div className="input-area">
            <label htmlFor="priceInput">Price</label><span> </span>
            <Field name="priceInput" component="input" type="text" value="100" />
          </div>
          <div className="input-area">
            <label htmlFor="quantityInput">Amount</label><span> </span>
            <Field name="quantityInput" component="input" type="text" value="100" />
          </div>
          <button type="submit" className={`${calculateColour(BUY_COLOUR, SELL_COLOUR)} orderForm-submit`}>Place {props.selectedAction} Order</button>
        </form>
      </div>
    )
}

SubmitOrderForm = reduxForm({
    form: 'order'
})(SubmitOrderForm)

SubmitOrderForm.propTypes = {
  changeActionType: PropTypes.func,
  selectedAction: PropTypes.string,
};

export default SubmitOrderForm;