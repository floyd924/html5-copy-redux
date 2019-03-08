import React, {Component} from 'react';
import { connect } from "react-redux";
import {getMarketDepth} from '../../actions/index.js';
import Chart from './Chart.js';

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


                <svg id="chart-box" className="chart-container-two"> 
                    <Chart  data={this.props.marketDepth}/>
                </svg>


                




                
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);