import { Constants } from 'expo';
import { StyleSheet, View, Platform } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

export default class MeasureLayout extends React.Component {

	static propTypes = {
		children: PropTypes.func.isRequired,
	};


	state = {
		layout: null,
	};

	handleLayout = event => {

		const { nativeEvent: { layout }} = event;

		this.setState({
			layout: {
				...layout,
				y:
					layout.y +
					( Platform.OS === 'android' ? Constants.statusBarHeight : 0 ), 
			},
		});
	};

	render(){

		const { children } = this.props;
		const { layout } = this.state;

		// Measure the available space with a placeholder view set to flex 1
		// Take care that the function called in onLayout does not cause the 
		// component to rerender (by making changes to state on which the
		// component depends,for example) as this would create an infinite loop.
				
		if (!layout){
			return <View onLayout={this.handleLayout} style={styles.container}/>;
		}

		return children( layout );
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});