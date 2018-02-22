import { connect } from 'react-redux';
import OrderBook from '../components/OrderBook';

const mapDispatchToProps = {
};

function mapStateToProps(state) {
    return {
        orderBook: state.example.orderBook,
        accountId: state.example.accountId,
        viewPrivate: state.example.viewPrivate,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);
