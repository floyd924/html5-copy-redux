import React, {Component} from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SubmitOrderForm from './SubmitOrderForm';
import io from 'socket.io-client';

var clientSocket = io('91.224.190.163:4000');

const sumbitOrderBook = function(accountId, viewPrivate) {
    const data = {private: viewPrivate, accountId: accountId};
    clientSocket.emit('requestOrderBook', data);
}

const sendOrder = function(accountId, price, quantity, action) {
    const data = {
        accountId,
        price,
        quantity,
        action,
    }
    clientSocket.emit('placeOrder', data);
}  

class OrderForm extends Component {

    submit = values => {
        sendOrder(this.props.accountId, parseFloat(values.priceInput), parseFloat(values.quantityInput), this.props.selectedAction);
        sumbitOrderBook(this.props.accountId, true);
    }

    requestOrderBook = (accountId, isPrivate) => {
        sumbitOrderBook(accountId, isPrivate);
    }

    render() {
        const {
            changeAccount,
            changeActionType,
            accountId,
            allAccounts,
            selectedAction,
        } = this.props;
        return (
                <div className="orderForm col-xs-12 col-sm-12">
                    <div className="columnTitle">
                        <h2>Order Form</h2>
                    </div> 
                    <div className="panelPadding">
                        <p className="accountInfo">You are signed in to:</p>
                        <h3>{allAccounts.find((accountTest) => accountTest.id === accountId).name}</h3>
                        <DropdownButton
                            className="dropdown-button"
                            bsStyle={"default"}
                            title="Change Account"
                            id={`dropdown-basic-${1}`}
                            >
                            {allAccounts.map(account =>
                                <MenuItem eventKey={account.id} key={account.id} onClick={() => {
                                    changeAccount(account.id);
                                    this.requestOrderBook(account.id, true);
                                }}>
                                    {account.name}
                                </MenuItem>
                            )}
                        </DropdownButton>
                        <SubmitOrderForm onSubmit={this.submit} changeActionType={changeActionType} selectedAction={selectedAction} />
                    </div>
                </div>
        )
    }
}

OrderForm.propTypes = {
    accountId: PropTypes.number.isRequired,
    allAccounts: PropTypes.array.isRequired,
    changeAccount: PropTypes.func,
    changeActionType: PropTypes.func,
    selectedAction: PropTypes.string,
};

export default OrderForm;