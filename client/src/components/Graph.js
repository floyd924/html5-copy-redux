import React, {Component} from 'react';
import { connect } from "react-redux";
import {getMarketDepth} from '../Actions/index.js';

const mapStateToProps = state => ({ marketDepth: state.marketDepth });
const mapDispatchToProps = dispatch => ({ getMarketDepth: () => dispatch(getMarketDepth()) })

class Graph extends Component {

    constructor(props){
        super(props);
        this.getData();
    }

    getData = function(){
        this.props.getMarketDepth();

    }


    render(){
        return(
            <div className="graph-container">
                <h2>here is the graph</h2>
                <div className="chart">
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);