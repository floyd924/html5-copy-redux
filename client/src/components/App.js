import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './App.css';
import TopBar from './TopBar.js';
import Recents from './Recents.js';
import OrderBook from './OrderBook.js';
import MyOrders from './MyOrders.js';
import Graph from './Graph.js';
import Form from './Form.js';
import store from '../store/index';

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



//===========================================================================================
const mapStateToProps = (state) => {
  return { state };
};

console.log("looking for store.getState in App.js", store.getState())


export default connect(mapStateToProps)(App);
//============================================================================================

// export default App;