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
		images: [],
	};

	//Member variables to help with fetching images from CameraRoll
	loading = false;
	cursor = null;


	componentDidMount(){

		this.getImages();

	}

	getImages = async ( after ) => {

		if (this.loading) return;

		this.loading = true;

		const { status } = await Permissions.askAsync( Permissions.CAMERA_ROLL );

		if ( status !== 'granted' ){

			console.log( 'CameraRoll permission denied' );
			return; 

		}

		const results = await CameraRoll.getPhotos( { first: 20, after, });
		const { edges, page_info: { has_next_page, end_cursor } } = results;

		const loadedImages = edges.map( item => item.node.image );

		// Array.prototype.concat() method returns a NEW ARRAY
		// second argument to setState() a callback executed after
		// state is updated.  In this case, it sets the member property
		// loading to false.  This lets us load another set of of image if
		// needed.

		this.setState( 
			{ 
				images: this.state.images.concat(loadedImages),
			},
			() => {
				this.loading = false;
				this.cursor = has_next_page ? end_cursor : null;
			},
		);
	};

	getNextImages = async () => {

		if (!this.cursor) return;

		this.getImages( this.cursor );

	}



	renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {

		const { onPressImage } = this.props;

		const style = {
			width: size,
			height: size,
			marginLeft,
			marginTop
		};

		return ( 
			<TouchableOpacity
				key={uri}
				activeOpacity={0.75}
				style={style}
				onPress={()=>onPressImage(uri)}
			>
				
				<Image source={{ uri }} style={styles.image} />

			</TouchableOpacity> 
		);

	};


	render() {

		const { images } = this.state;

		return (

			<Grid
				data={images}
				renderItem={this.renderItem}
				keyExtractor={keyExtractor}
				onEndReached={this.getNextImages}
			/>

		);


	}


}


const styles = StyleSheet.create({
	image: {
		flex: 1, 
	},
});