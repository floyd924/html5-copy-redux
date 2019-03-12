import * as d3 from 'd3';
import React, { Component } from 'react';
import { connect } from "react-redux";
import {getMarketDepth} from '../../actions/index.js';

const mapStateToProps = state => ({ marketDepth: state.marketDepth });
const mapDispatchToProps = dispatch => ({ getMarketDepth: () => dispatch(getMarketDepth()) })



class  Chart extends Component {

    constructor(props){
        super(props)
        this.state= {
            previouslyPopulated: false
        }
        this.getData()

    }

    getData () {
        this.props.getMarketDepth()
    }



    componentDidUpdate(){
        // if (this.state.previouslyPopulated) {
        //     console.log("state is true")
        //     d3.select(".chart-svg").remove()
        //     this.setState({ populated: false })
        // }
        // this.setState({ previouslyPopulated: true })
        this.drawLineGraph();
    }



    //I am trying to refactor these three getArray methods below. 
    //But each method requires a slightly different output
    //and each are needed for future calculations



    getArrayOfDepths() {
        const arrayOfDepths = []
        this.props.marketDepth.buys.forEach(object => {
            arrayOfDepths.push(parseFloat(object.depth))
        });
        this.props.marketDepth.sells.forEach(object => {
            arrayOfDepths.push(parseFloat(object.depth))
        });
        arrayOfDepths.sort()
        return arrayOfDepths;
    }


    getArrayOfPrices () {
        const arrayOfPrices = []
        this.props.marketDepth.buys.forEach(object => {
            arrayOfPrices.push(parseFloat(object.price))
        });
        this.props.marketDepth.sells.forEach(object => {
            arrayOfPrices.push(parseFloat(object.price))
        });
        arrayOfPrices.sort();
        return arrayOfPrices;
    }

    //returns objects with price and depth
    getArrayOfCoordinates () {
        const arrayOfCoordinates = []
        const sortedBuys = this.sortByPrice(this.props.marketDepth.buys)
        const sortedSells = this.sortByPrice(this.props.marketDepth.sells)
        sortedBuys.forEach(object => {
            arrayOfCoordinates.push(object)
        });
        sortedSells.forEach(object => {
            arrayOfCoordinates.push(object)
        });
        return arrayOfCoordinates
    }


    sortByPrice (array) {

        array.sort(function(a,b){
            return a.price - b.price
        })
        return array;
    }

    //returns the price at which graph colours will change from green to red
    getMidPrice () {

        const sortedBuys = this.sortByPrice(this.props.marketDepth.buys)
        const sortedSells = this.sortByPrice(this.props.marketDepth.sells)
        const highestBuyPrice = parseFloat(sortedBuys[sortedBuys.length -1].price);
        const lowestSellPrice = parseFloat(sortedSells[0].price);
        const midPrice = (lowestSellPrice + highestBuyPrice)/2;
        return midPrice;
    }


    drawLineGraph(){

        //height of graph container depends on height of orderbook
        const parentContainer = document.getElementById("chart-box");
        const margin = {top: 50, right: 50, bottom: 50, left: 50}
        const width = parentContainer.clientWidth - margin.left - margin.right;
        const height = parentContainer.clientHeight - margin.top - margin.bottom;

        
            
        const depthData = this.getArrayOfDepths();
        const priceData = this.getArrayOfPrices();
        const coordinates = this.getArrayOfCoordinates();
        const midPrice = this.getMidPrice();


    
        //find max and min of X and Y data for scale
        const maxPrice = Math.max(...priceData);
        const maxDepth = Math.max(...depthData);
        const minPrice = Math.min(...priceData);
        const minDepth = Math.min(...depthData);




        const xScale = d3.scaleLinear()
            .domain([minPrice-1, maxPrice+1]) // data size
            .range([0, width]); //space axis takes up
        
        const yScale = d3.scaleLinear()
            .domain([minDepth-1, maxDepth+1])
            .range([height, 0]); //because y axis is automatically top to bottom, the zero goes second.



        const line = d3.line()
            .x(function(d) { return xScale(d.price); }) //put the price value on the x scale
            .y(function(d) { return yScale(d.depth); }) //put the depth value on the y scale 
            .curve(d3.curveMonotoneX)


        
        //this gets rid of all the data points before we generate new ones
        d3.select(".chart-svg").selectAll("g").remove();

        const svg = d3.select(".chart-svg").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));
        
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));

        svg.append("path")
            .datum(coordinates) // feed in the data set here
            .attr("class", "line")
            .attr("d", line);
            

        svg.selectAll(".dot")
            .data(coordinates)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", function(d) { return xScale(d.price) })
            .attr("cy", function(d) { return yScale(d.depth) })
            .attr("r", 5)
            .style("fill", function(d) {
                if ( d.price > midPrice) { return "red" } else { return "green" }
            })


        


    }



    render(){
        return(
            // <svg className="chart-svg"></svg>
            null
        );
    }

}
    

export default connect(mapStateToProps, mapDispatchToProps)(Chart);