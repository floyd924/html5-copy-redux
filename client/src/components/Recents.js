import React, { Component} from 'react';
import {connect} from "react-redux";
import { getTrades } from '../actions/index.js';



const mapStateToProps = (state) => {
    return { trades: state.trades };
};

function mapDispatchToProps(dispatch){
    return {
        getTrades: article => dispatch(getTrades())
    };
}


    
class Recents extends Component {

    constructor(props){
        super(props);

    }

    getData = function(){
        const allTrades = [];

        this.props.getTrades().then(trades => trades.forEach(trade => {
           //create an html element
           allTrades.push(
                <tr>
                   <td>{trade.size}</td>
                   <td>{trade.price}</td>
               </tr>)}

           ))
           ;

        console.log("allTrades is:", allTrades)
        allTrades.forEach(item => ( console.log("hi", item)))

        // console.log("allTrades[0] is:", allTrades[0])

        // {

        //     <tr>
        //        <td>{trade.size}</td>
        //        <td>{trade.value}</td>
        //    </tr>
        // }
        // let tableRows = allTrades.map(x => 
        //     console.log(x.value));
        // console.log("tableRows are:", tableRows)
        // return tableRows;
    }

    



    render(){

        // const mapStateToProps = state => {
        //     return { trades: state.trades };
        // };

        // const data = this.props.getTrades();
        // console.log(data);

        // let data = this.props.getTrades();

        return(
            <div className="recents-container">

                <h2>Recent Completed Trades</h2>


                <div class="table-wrapper-scroll-y">
                    <table class="table table-dark table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Size</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {this.getData()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Recents);