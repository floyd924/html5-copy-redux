import React, { Component } from 'react';

class TopBar extends Component {
    render(){
        return(
            <div className="top-bar">
                <img className="logo" src="./logo.jpg" />
                <h1 className="app-title">LogicFX Bitcoin Trader</h1>
                <div className="login">
                    <h2 className="login-text">Logged in as:</h2>
                    <select className="login-select">
                        <option value="iain">Iain</option>
                        <option value="benj">Benj</option>
                        <option value="steve">Steve</option>
                    </select>
                    <button type="button" className="btn btn-warning">Change</button>

                </div>
            </div>
        )
    }
}

export default TopBar;