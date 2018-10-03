import { CameraRoll, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Permissions } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';

import Grid from './Grid';


const keyExtractor = ({ uri }) => uri;

export default class ImageGrid extends React.Component {

	static propTypes = {
		onPressImage: PropTypes.func,
	};

	static defaultProps = {
		onPressImage: () => {},
	};

	state = {
		images: [
		 { uri: 'https://picsum.photos/600/600?image=10' },
		 { uri: 'https://picsum.photos/600/600?image=20' },
		 { uri: 'https://picsum.photos/600/600?image=30' },
		 { uri: 'https://picsum.photos/600/600?image=40' },
		  { uri: 'https://picsum.photos/600/600?image=50' },
		 { uri: 'https://picsum.photos/600/600?image=60' },
		 { uri: 'https://picsum.photos/600/600?image=70' },
		 { uri: 'https://picsum.photos/600/600?image=80' },
		  { uri: 'https://picsum.photos/600/600?image=90' },
		 { uri: 'https://picsum.photos/600/600?image=100' },
		 { uri: 'https://picsum.photos/600/600?image=130' },
		 { uri: 'https://picsum.photos/600/600?image=140' },
		  { uri: 'https://picsum.photos/600/600?image=210' },
		 { uri: 'https://picsum.photos/600/600?image=220' },
		 { uri: 'https://picsum.photos/600/600?image=230' },
		 { uri: 'https://picsum.photos/600/600?image=240' },
		  { uri: 'https://picsum.photos/600/600?image=310' },
		 { uri: 'https://picsum.photos/600/600?image=320' },
		 { uri: 'https://picsum.photos/600/600?image=330' },
		 { uri: 'https://picsum.photos/600/600?image=340' },
		  { uri: 'https://picsum.photos/600/600?image=410' },
		 { uri: 'https://picsum.photos/600/600?image=420' },
		 { uri: 'https://picsum.photos/600/600?image=430' },
		 { uri: 'https://picsum.photos/600/600?image=440' },
		  { uri: 'https://picsum.photos/600/600?image=510' },
		 { uri: 'https://picsum.photos/600/600?image=520' },
		 { uri: 'https://picsum.photos/600/600?image=530' },
		 { uri: 'https://picsum.photos/600/600?image=540' },
		],
	};


	renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
		const style = {
			width: size,
			height: size,
			marginLeft,
			marginTop
		};

		return ( <Image source={{ uri }} style={style} /> );

	};


	render() {

		const { images } = this.state;

		return (

			<Grid
				data={images}
				renderItem={this.renderItem}
				keyExtractor={keyExtractor}
			/>

		);


	}


}


const styles = StyleSheet.create({
	image: {
		flex: 1, 
	},
});