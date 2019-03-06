import React, {Component} from 'react';
import { connect } from "react-redux";
import {getMarketDepth} from '../Actions/index.js';
import DemoChart from './DemoChart.js';

const mapStateToProps = state => ({ marketDepth: state.marketDepth });
const mapDispatchToProps = dispatch => ({ getMarketDepth: () => dispatch(getMarketDepth()) })

class Graph extends Component {

    constructor(props){
        super(props);
        this.getData();
    }

    getData = function(){
        //this.props.getMarketDepth();
        //maybe going to do this in the chart component instead of here?

    }


    render(){
        return(
            <div className="graph-container">
                <h2>here is the graph</h2>
                <svg className="chart-container" width="400" height="300">
                    <DemoChart width={400} height={300} data={this.props.marketDepth}/>
                </svg>
                {/* <div className="chart">
                <script src="http://d3js.org/d3.vs.js"></script>
                <script>
                    const yAxis = [ 10, 8, 6, 4, 2, 0, 1, 3, 5, 7, 9 ];
                    console.log(yAxis)
                </script>
                <script src="./demoScript.js"></script>
                </div> */}




                
                {/* <script src="./chart.js" type="text/babel" data={this.props.marketDepth}></script> */}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);