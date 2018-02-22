import { connect } from 'react-redux';
import PriceChart from '../components/PriceChart';

const mapDispatchToProps = {
};

function mapStateToProps(state) {
    return {
        windowResized: state.example.windowResized,
        orderBook: state.example.orderBook,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceChart);
