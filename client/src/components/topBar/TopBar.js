import React, { Component } from 'react';
import { changeUser } from '../../actions/index';
import { getMyOrders } from '../../actions/index';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return { 
        user: state.user,
        myOrders: state.myOrders 
    };
}

function mapDispatchToProps(dispatch){
    return {
        changeUser: user => dispatch(changeUser(user)),
        getMyOrders: name => dispatch(getMyOrders(name))
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
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        this.props.changeUser(this.state);
    }


    handleNameChange(event){
        this.setState({name: event.target.value})
    }

    handleButtonClick(){
        this.props.changeUser(this.state);
        this.props.getMyOrders(this.state.name);
    }

    render(){
        return(
            <div className="top-bar">
                <img className="logo" src="./logo.jpg" alt="company-logo"/>
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