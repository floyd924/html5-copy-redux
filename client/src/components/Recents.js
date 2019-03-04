import React, { Component} from 'react';
import {connect} from "react-redux";
import { getTrades } from '../Actions/index.js';

const mapStateToProps = state => ({ trades: state.trades });

const mapDispatchToProps = dispatch => ({ getTrades: () => dispatch(getTrades())});

    
class Recents extends Component {

    constructor(props){
        super(props);
        //should i put this in 'componentDidMount?'
        this.getData();
    }

    getData = function(){
        this.props.getTrades()
    }

    
    render(){

        return(
            <div className="recents-container">

                <h2>Recent Completed Trades</h2>


                <div className="table-wrapper-scroll-y">
                    <table className="table table-dark table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Size</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {this.props.trades ? this.props.trades.map((trade, index) => {
                                return (
                                    <tr key={index}>
                                       <td>{trade.size}</td>
                                       <td>{trade.price}</td>
                                   </tr>)
                            }): null }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Recents);