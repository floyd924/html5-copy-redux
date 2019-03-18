import React, { Component} from 'react';
import {connect} from 'react-redux';
import { getTrades } from '../../actions/index.js';
import openSocket from 'socket.io-client';

const mapStateToProps = state => ({ trades: state.trades });
const mapDispatchToProps = dispatch => ({ getTrades: (data) => dispatch(getTrades(data)) });

class Recents extends Component {

    constructor(props){
        super(props);
        const that = this;
        this.socket = openSocket('http://localhost:3001');
        this.socket.on('receiveTradeData', function(data){
            that.dispatchStuff(data)
        })
        this.getData();
    }

    getData (){
        this.socket.emit('getRecentTrades')
    }

    dispatchStuff (data) {
        this.props.getTrades(data);
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