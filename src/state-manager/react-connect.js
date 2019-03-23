import React from 'react';
import {observer} from './index';

const Context = React.createContext(null);

class Provider extends React.Component {
	render() {
		return (
			<Context.Provider value={this.props.store}>
				{this.props.children}
			</Context.Provider>
		)
	}
}

const connect = selector => Component => {
	return observer(class Connect extends React.PureComponent {
		render() {
			return (
				<Context.Consumer>
					{store => (
						<Component {...selector(store)} {...this.props} />
					)}
				</Context.Consumer>
			);
		}
	});
}

export {Provider, connect};
