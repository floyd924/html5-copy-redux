import { connect } from 'react-redux';
import TradeBook from '../components/TradeBook';

const mapDispatchToProps = {
};

function mapStateToProps(state) {
    return {
        tradeBook: state.example.tradeBook,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeBook);
