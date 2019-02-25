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
        this.state = {
            allTrades: []
        };
        this.getData();
    }

    getData = function(){
        this.props.getTrades().then(data => this.setState({allTrades: data}));
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
                            {this.state.allTrades.map((trade) => {
                                return (
                                    <tr>
                                       <td>{trade.size}</td>
                                       <td>{trade.price}</td>
                                   </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Recents);