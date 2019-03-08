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
            buys: [],
            sells: []
        }
        this.getData()

        
    }

    getData = function(){
        this.props.getMarketDepth()
    }



    componentDidUpdate(){
        // this.drawChart();
        this.drawLineGraph();

    }

    drawChart() {
        // //declare data and get data into an array
        // const arrayOfDepths = []
        //     this.props.marketDepth.buys.forEach(object => {
        //         arrayOfDepths.push(object.rate)
        //     });
        //     this.props.marketDepth.sells.forEach(object => {
        //         arrayOfDepths.push(object.rate)
        //     });
            
        // const dataPoints = arrayOfDepths;


        // const svg = d3.select(".bananas")
        // // const svg = d3.select(".bananas") ========> will append the graph into the section with class 'bananas'
        //     .append("svg")
        //     .attr("width", 700) //shorten this and data is chopped off - should try and use props?
        //     .attr("height", 300) //shorten these and data is chopped off - should try and use props?


        // //create some bars
        // svg.selectAll("rect") //this creates rectangles
        //     .data(dataPoints)
        //     .enter() //this loops thru the data points
        //     .append("rect")
        //     .attr("x", (d,i) => i*50)
        //     .attr("y", (d) => 300-d*2 ) //box size minus height, to make each bar appear on the bottom, not the top
        //     .attr("width", 25)
        //     .attr("height", (d,i) => d * 2)
        //     .attr("fill", "pink"); //rectangles will be pink

        // //add some text to the bars
        // svg.selectAll("text")
        //     .data(dataPoints)//for each data point
        //     .enter()//we will perform the following munipulation
        //     .append("text")
        //     .text((d) => d)
        //     .attr("x", (d, i) => i*50)
        //     .attr("y", (d, i) => 300 - (2*d) - 1)
    }

    //refactoer these methods into one 
    getArrayOfDepths = () => {
        const arrayOfDepths = []
        this.props.marketDepth.buys.forEach(object => {
            arrayOfDepths.push(object.depth)
        });
        this.props.marketDepth.sells.forEach(object => {
            arrayOfDepths.push(object.depth)
        });
        return arrayOfDepths;
    }
    //refactor these methods into one 
    getArrayOfPrices = () => {
        const arrayOfPrices = []
        this.props.marketDepth.buys.forEach(object => {
            arrayOfPrices.push(object.price)
        });
        this.props.marketDepth.sells.forEach(object => {
            arrayOfPrices.push(object.price)
        });
        return arrayOfPrices;
    }

    getArrayOfCoordinates = () => {
        const arrayOfCoordinates = []
        this.props.marketDepth.buys.forEach(object => {
            arrayOfCoordinates.push(object)
        });
        this.props.marketDepth.sells.forEach(object => {
            arrayOfCoordinates.push(object)
        });
        return arrayOfCoordinates
    }

    getMidPrice = () => {
        const highestBuyPrice = parseInt(this.props.marketDepth.buys.pop().price);
        const lowestSellPrice = parseInt(this.props.marketDepth.sells.shift().price);
        const midPrice = (lowestSellPrice + highestBuyPrice)/2;
        return midPrice;
    }


    drawLineGraph(){

        
        
        const parentContainer = document.getElementById("chart-box");
        const margin = {top: 50, right: 50, bottom: 50, left: 50}
        const width = parentContainer.clientWidth - margin.left - margin.right;
        const height = parentContainer.clientHeight - margin.top - margin.bottom;

        
            
        const depthData = this.getArrayOfDepths();
        const priceData = this.getArrayOfPrices();
        const coordinates = this.getArrayOfCoordinates();
        const midPrice = this.getMidPrice();


    
        const n = depthData.length;
        const maxPrice = Math.max(...priceData);
        const maxDepth = Math.max(...depthData);
        const minPrice = Math.min(...priceData);
        const minDepth = Math.min(...depthData);




        const xScale = d3.scaleLinear()
            .domain([minPrice-1, maxPrice+1])
            .range([0, width]);
        
        const yScale = d3.scaleLinear()
            .domain([minDepth-1, maxDepth+1])
            .range([height, 0]);



        const line = d3.line()
            .x(function(d) { return xScale(d.price); }) 
            .y(function(d) { return yScale(d.depth); }) 
            .curve(d3.curveMonotoneX)

        const svg = d3.select(".bananas").append("svg")
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
            <svg className="bananas"></svg>
        )
    }

}
    

export default connect(mapStateToProps, mapDispatchToProps)(Chart);