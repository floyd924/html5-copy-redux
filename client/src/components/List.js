import React, {Component} from 'react';

export default class List extends Component {
   render() {
	   console.log(this.props);
        return (
			<ul>
			{this.props.numbers.map((number) => <li>{number}</li>)}
			</ul>
        );
    }
}