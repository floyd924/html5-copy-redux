import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3-selection';
import D3Chart from './D3Chart';

class PriceChart extends Component {

    
    setChartElement(element) {
        const { orderBook } = this.props;

        const priceChartEl = d3.select('.PriceChart').node();
        const priceChartDimensions = priceChartEl.getBoundingClientRect();
        
        const smallMargin = 30;
        const width = priceChartDimensions.width;
        const height = 450 + smallMargin;
    
        const maxQuantity = Math.max(...orderBook.map(o => o.quantity));
        const maxPrice = Math.max(...orderBook.map(o => o.price));
        const minQuantity = Math.min(...orderBook.map(o => o.quantity));
        const minPrice = Math.min(...orderBook.map(o => o.price));

        if (this.d3Chart) {
          this.d3Chart.destroy();
          this.d3Chart = null;
        }
        if (element) {
          this.d3Chart = new D3Chart(element);
          this.d3Chart.initialise(minPrice, maxPrice, minQuantity, maxQuantity, height, width);
          this.d3Chart.update(orderBook);
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (this.d3Chart) {
        //     this.d3Chart.update(nextProps.orderBook);
        // }
        // console.log(this.props.windowResized);
        // if (this.props.windowResized !== nextProps.windowResized) {
        //     if (this.d3Chart) {
        //         const priceChartEl = d3.select('.PriceChart').node();
        //         const priceChartDimensions = priceChartEl.getBoundingClientRect();
        //         const width = priceChartDimensions.width;
        //         console.log(width);
        //         this.d3Chart.resize()
        //         this.d3Chart.render();
        //     }
        // }
    }

    shouldComponentUpdate(nextProps) {
        const shouldComponentUpdate = this.props.orderBook !== nextProps.orderBook.length;
        if (shouldComponentUpdate) {
            this.d3Chart.update(nextProps.orderBook);
        }
        if (this.props.windowResized !== nextProps.windowResized) {
            if (this.d3Chart) {
                const priceChartEl = d3.select('.PriceChart').node();
                const priceChartDimensions = priceChartEl.getBoundingClientRect();
                const width = priceChartDimensions.width;
                this.d3Chart.resize(width);
            }
        }
        return shouldComponentUpdate;
    }

    componentWillUnmount() {
        if (this.d3Chart) {
          this.d3Chart.destroy();
          this.d3Chart = null;
        }
    }

    render() {
        return (
            <div className="columnTitle PriceChart">
                <h2>Price Chart</h2>
                <div className="chart" ref={element => this.setChartElement(element)}>
                </div>   
            </div> 
        )
    }
}

PriceChart.propTypes = {
    orderBook: PropTypes.array.isRequired,
};

export default PriceChart;