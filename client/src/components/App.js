import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import logo from '../logo.svg';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React {this.props.name}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

App.propTypes = {
  name: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    name: state.example.name
  };
}

export default connect(mapStateToProps)(App);
