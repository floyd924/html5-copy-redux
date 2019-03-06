import * as d3 from 'd3';
import React, { Component } from 'react';
import { connect } from "react-redux";
import {getMarketDepth} from '../Actions/index.js';

const mapStateToProps = state => ({ marketDepth: state.marketDepth });
const mapDispatchToProps = dispatch => ({ getMarketDepth: () => dispatch(getMarketDepth()) })

//this graph form play4.html?

//miond and copy your styles into app.css 

class  DemoChart extends Component {

    //constructor?
    constructor(props){
        super(props)
        this.state= {
            buys: [],
            sells: []
        }
        this.getData()
    }

    getData = function(){
        this.props.getMarketDepth()
    }


    

    //bind this?

    componentWillMount(){

        //get data
        const demoData = [100, 80, 60, 40, 20, 0, 10, 30, 50, 70, 90]

        //this.getData()
        
        //set state 

        //i need to do this because I need to have some data points in the state

    }


    componentDidUpdate(){

        //setState ?

        const svg = d3.select(this.refs.anchor),
            {width, height} = this.props;
            //const data = this.state.data1;
            console.log("data being used", this.props.marketDepth.buys)
            const arrayOfDepths = []
            this.props.marketDepth.buys.forEach(object => {
                arrayOfDepths.push(object.rate)
            });
            this.props.marketDepth.sells.forEach(object => {
                arrayOfDepths.push(object.rate)
            });
            console.log("array of numbers is:", arrayOfDepths)

            var barHeight = 10;
            var bar = d3.select('svg')
            .selectAll('rect')
            // .data(this.state.buys)
            .data(arrayOfDepths)
            .enter()
            .append('rect')
            .attr('width', function(d) {  return d * 10; })
            .attr('height', barHeight - 1)
            .attr('transform', function(d, i) {
                return "translate(0," + i * barHeight + ")";
            });
    }


    render() {

        const { data1, data2 } = this.state;

        if (!data1) {
            return <p>hello world</p>
        }

        return <g ref="anchor" />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoChart);