import { connect } from 'react-redux';
import OrderForm from '../components/OrderForm';
import { changeAccount, changeActionType } from '../actions/accountActions';

const mapDispatchToProps = {
    changeAccount,
    changeActionType,
};

function mapStateToProps(state) {
    return {
        name: state.example.name,
        accountId: state.account.accountId,
        allAccounts: state.account.allAccounts,
        selectedAction: state.account.selectedAction,
        orderBook: state.example.orderBook,
        tradeBook: state.example.tradeBook,
        marketAverage: state.example.marketAverage,
        viewPrivate: state.example.viewPrivate,
        privateOrderBook: state.example.privateOrderBook,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
