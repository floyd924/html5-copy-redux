import React, { Component} from 'react';
import {connect} from "react-redux";
import { getTrades } from '../actions/index.js';

const mapStateToProps = (state) => {
    return { trades: state.trades };
};


//what does 'trade' do here?
function mapDispatchToProps(dispatch){
    return {
        getTrades: trade => dispatch(getTrades())
    };
}

    
class Recents extends Component {

    constructor(props){
        super(props);
        this.getData();
    }

    //should i put this in 'componentDidMount?'
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