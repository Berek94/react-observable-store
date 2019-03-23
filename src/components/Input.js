import React from 'react';
import {connect} from '../state-manager/react-connect';

class Input extends React.Component {
	handleInputChange({target: {value}}) {
		this.props.changeInput(value);
	}

	handleAddTodo(event) {
		event.preventDefault();

		this.props.addTodo();
	}

	render() {
		return (
			<form onSubmit={this.handleAddTodo.bind(this)}>
				<input
					type="text"
					value={this.props.value}
					onChange={this.handleInputChange.bind(this)}
				/>
			</form>
		);
	}
}

export default connect(store => ({
	value: store.input,
	addTodo: store.addTodo,
	changeInput: store.changeInput,
}))(Input);
