import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import './form/Form.css';
import './graph/Graph.css';
import './myOrders/MyOrders.css';
import './orderBook/OrderBook.css';
import './recents/Recents.css';
import './topBar/TopBar.css';
import TopBar from './topBar/TopBar.js';
import Recents from './recents/Recents.js';
import OrderBook from './orderBook/OrderBook.js';
import MyOrders from './myOrders/MyOrders.js';
import Graph from './graph/Graph.js';
import Form from './form/Form.js';

export class App extends Component {
    render() {
        return (
            <div className="grid">
                <div className="top">
                    <TopBar />
                </div>
                <div className="recents">
                    <Recents />
                </div>
                <div className="pracs">
                    <Form />
                </div>
                <div className="order-book">
                    <OrderBook />
                </div>
                <div className="my-orders">
                    <MyOrders />
                </div>
                <div className="graph">
                    <Graph />
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => state;


export default connect(mapStateToProps)(App);
