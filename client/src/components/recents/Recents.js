import React, { Component} from 'react';
import {connect} from "react-redux";
import { getTrades } from '../../actions/index.js';

const mapStateToProps = state => ({ trades: state.trades });

const mapDispatchToProps = dispatch => ({ getTrades: () => dispatch(getTrades())});

    
class Recents extends Component {

    constructor(props){
        super(props);
        this.getData();
    }

    getData (){
        this.props.getTrades()
    }

    
    render(){

        return(
        <div className="recents-container">

            <h2>Latest Trades</h2>


                <div className="table-wrapper-scroll-y">
                    <table id="latest-table">
                        <thead>
                            <tr>
                                <th scope="col">Size</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {this.props.trades.map((trade, index) => {
                                return (
                                    <tr key={index}>
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