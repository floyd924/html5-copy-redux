import React, {Component} from 'react';
import { connect } from "react-redux";
import Chart from './Chart.js';

const mapStateToProps = state => ({ marketDepth: state.marketDepth });

class Graph extends Component {
    constructor(props){
        super(props);
    }

    render(){ 
        return(
            <div className="graph-container">
                <h2>here is the graph</h2>

                <svg id="chart-box" className="chart-container-two"> 
                    <Chart data={this.props.marketDepth}/>
                </svg>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Graph);