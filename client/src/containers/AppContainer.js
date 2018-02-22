import { connect } from 'react-redux';
import { changeAccount } from '../actions/accountActions';
import { changeActionType, togglePrivate, updatePrivateOrderBook } from '../actions/orderActions';
import App from '../components/App';

const mapDispatchToProps = {
    changeAccount,
    changeActionType,
    togglePrivate,
    updatePrivateOrderBook,
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
        // windowResized: state.exampe.windowResized,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
