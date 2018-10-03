import { StyleSheet, FlatList, Image, Dimensions, PixelRatio } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

export default class Grid extends React.Component {

	static propTypes = {
		renderItem: PropTypes.func.isRequired,
		numColumns: PropTypes.number,
		itemMargin: PropTypes.number,
	};

	static defaultTypes = {
		numColumns: 4,
		itemMargin: StyleSheet.hairlineWidth,
	};



	renderGridItem = ( info ) => {

		const { uri } = info;
		console.log( 'in renderGridItem', uri );
		console.log( info );

		const { index } = info;
		const { renderItem, numColumns, itemMargin } = this.props;

		const { width } = Dimensions.get( 'window' );


		const size = PixelRatio.roundToNearestPixel(
			( width - itemMargin * (numColumns - 1)) / numColumns,
		);

		const marginLeft = index % numColumns === 0 ? 0 : itemMargin;
		const topMargin = index < numColumns ? 0 : itemMargin;

		//...

		return renderItem( {...info, size, marginLeft, topMargin });

	};


	render() {
		return ( <FlatList {...this.props } renderItem={this.renderGridItem} /> );
	};







}