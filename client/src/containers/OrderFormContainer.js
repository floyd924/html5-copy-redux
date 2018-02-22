import { connect } from 'react-redux';
import OrderForm from '../components/OrderForm';
import { changeAccount } from '../actions/accountActions';
import { changeActionType } from '../actions/orderActions';

const mapDispatchToProps = {
    changeAccount,
    changeActionType,
};

function mapStateToProps(state) {
    return {
        name: state.example.name,
        accountId: state.example.accountId,
        allAccounts: state.example.allAccounts,
        selectedAction: state.example.selectedAction,
        orderBook: state.example.orderBook,
        tradeBook: state.example.tradeBook,
        marketAverage: state.example.marketAverage,
        viewPrivate: state.example.viewPrivate,
        privateOrderBook: state.example.privateOrderBook,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
