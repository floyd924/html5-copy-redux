import * as d3 from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { line, area } from 'd3-shape';
import * as axis from 'd3-axis';

class D3Chart {
    constructor(element) {
      this.selection = d3.select(element);
    }
  
    initialise(minPrice, maxPrice, minQuantity, maxQuantity, height, width) {
        this.maxQuantity = maxQuantity;
        this.minQuantity = minQuantity;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.height = height;
        this.width = width;
    }
  
    update(data) {
        this.destroy();
        const preparedDataSource = data.sort(function(a, b){return a.price - b.price});
        this.selection
            .datum(preparedDataSource);
    
        this.render();
    }
  
    render() {
      this.selection
        .call((selection) => this.chart(selection));
    }
  
    chart(selection) {
        const xScale = scaleLinear()
            .domain([this.minPrice, this.maxPrice])
            .range([0, this.width - 40]);

        const yScale = scaleLinear()
            .domain([this.minQuantity, this.maxQuantity])
            .range([this.height, 0]);

        const data = selection.datum();
        const svg = selection.append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("transform", "translate(" + 0 + ", 0)");

        const lineFunction = line()
            .x(function(d) { 
                return xScale(d.price); 
            })
            .y(function(d) { 
                return yScale(d.quantity);
            })/*.curve(curveStepAfter)*/;

        const buyData = data.filter(function(x) { return x.action === 'BUY'; });
        const sellData = data.filter(function(x) { return x.action === 'SELL'; });

        // Line function
        const lineGraphSell = svg.append("path")
        .data([(buyData)])
        .attr("d", lineFunction)
        .attr("stroke", "#84f766")
        .attr("stroke-width", 4)
        .attr("fill", "none");
        
        const lineGraphBuy = svg.append("path")
        .data([sellData])
        .attr("d", lineFunction)
        .attr("stroke", "#ff6939")
        .attr("stroke-width", 6)
        .attr("fill", "none");
        
        // Area Function
        const areaFunction = area()
        .x(function(d) { return xScale(d.price); })
        .y0(this.height)
        .y1(function(d) { return yScale(d.quantity); })/*.curve(curveStepAfter)*/;
        
        const sellArea = svg.append("path")
        .data([sellData])
        .attr("class", "sellArea")
        .attr("d", areaFunction);
       
        const buyArea = svg.append("path")
        .data([buyData])
        .attr("class", "buyArea")
        .attr("d", areaFunction);

        // Axis
        const axisBottomFunction = axis.axisBottom(xScale);
        axisBottomFunction.ticks(data.length, "s");
        
        const axisLeftFunction = axis.axisLeft(yScale);
        axisLeftFunction.ticks(data.length, "s");

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + 0 + ", 0)")
            .call(axisLeftFunction);
        
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (this.height) + ")")
            .call(axisBottomFunction);

        lineGraphBuy.exit().remove();
        lineGraphSell.exit().remove();
        buyArea.exit().remove();
        sellArea.exit().remove();
        
    }

    resize(width) {
        this.width = width;
        this.destroy();
        this.selection
            .call((selection) => this.chart(selection));
    }
  
    destroy() {
        this.selection.select('svg').remove();
    }
  }
  
  export default D3Chart;
  