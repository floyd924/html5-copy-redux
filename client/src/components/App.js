import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import logo from '../logo.svg';
import './App.css';
import List from './List';

export class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React {this.props.name}</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
				<List numbers={[1,2,3,4]} lulz="cat"/>
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
