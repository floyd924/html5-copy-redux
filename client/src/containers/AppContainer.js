import { connect } from 'react-redux';
import { changeAccount } from '../actions/accountActions';
import { togglePrivate } from '../actions/orderActions';
import { changeActionType } from '../actions/accountActions';
import { requestBitCoinApi } from '../actions/bitCoinApi';
import App from '../components/App';

const mapDispatchToProps = {
    togglePrivate,
    requestBitCoinApi,
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
        bitCoinJSON: state.example.bitCoinJSON,
        apiFetchSuccess: state.example.apiFetchSuccess,
        bitCoinLastUpdated: state.example.bitCoinLastUpdated,
        bitCoinEURRate: state.example.bitCoinEURRate,
        bitCoinGBPRate: state.example.bitCoinGBPRate,
        bitCoinUSDRate: state.example.bitCoinUSDRate,
        // windowResized: state.exampe.windowResized,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
