import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import logo from '../logo.svg';
import './App.css';
import TopBar from './TopBar.js';
import Recents from './Recents.js';
import Form from './Form.js';
import OrderBook from './OrderBook.js';
import MyOrders from './MyOrders.js';
import Graph from './Graph.js';
import Pracs from './Pracs.js';

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
          {/* <div classname="form">
            <Form />
          </div> */}
          <div className="pracs">
            <Pracs />
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

// App.propTypes = {
//   name: PropTypes.string.isRequired
// };

//===========================================================================================
// function mapStateToProps(state) {
//   return {
//     name: state.example.name
//   };
// }

// export default connect(mapStateToProps)(App);
//============================================================================================

export default App;