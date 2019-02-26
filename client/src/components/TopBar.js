import React, { Component } from 'react';
import { changeUser } from '../actions/index';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return { user: state.user };
}

function mapDispatchToProps(dispatch){
    return {
        changeUser: user => dispatch(changeUser(user))
    }
}


class TopBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "iain"
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }


    handleNameChange(event){
        console.log("name changes to", this.state.name)
        this.setState({name: event.target.value})
    }

    handleButtonClick(event){
        console.log("button clicked")
        this.props.changeUser(this.state);
    }

    render(){
        return(
            <div className="top-bar">
                <img className="logo" src="./logo.jpg" />
                <h1 className="app-title">LogicFX Bitcoin Trader</h1>
                <div className="login">
                    <h2 className="login-text">Logged in as:</h2>
                    <select onChange={this.handleNameChange} className="login-select">
                        <option value="iain">Iain</option>
                        <option value="benj">Benj</option>
                        <option value="steve">Steve</option>
                    </select>
                    <button onClick={this.handleButtonClick} type="button" className="btn btn-warning">Change</button>

                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);