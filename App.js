import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Alert, 
  Image, 
  TouchableHighlight,
  BackHandler,
} from 'react-native';

import Status from './components/Status';
import Toolbar from './components/Toolbar';
import ImageGrid from './components/ImageGrid';

import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';

export default class App extends React.Component {


  state = {
    messages: [
      createTextMessage('Once more unto the breach, dear friends, or fill the wall up with our English dead!'),
      createTextMessage('hi 1'),
      createImageMessage('https://unsplash.it/300/300'),
       createTextMessage('Once more unto the breach, dear friends, or fill the wall up with our English dead!'),
      createTextMessage('hi 2'),
      createImageMessage('https://unsplash.it/300/300'),
       createTextMessage('Once more unto the breach, dear friends, or fill the wall up with our English dead!'),
      createTextMessage('hi 3'),
      createImageMessage('https://unsplash.it/300/300'),
       createTextMessage('Once more unto the breach, dear friends, or fill the wall up with our English dead!'),
      createTextMessage('hi 4'),
      createImageMessage('https://unsplash.it/300/300'),
    ],

    fullscreenImageId: null,
    isInputFocused: false,

  };

  handlePressToolbarCamera = () => {};
  handlePressToolbarLocation = () => {

    console.log( 'location pressed' );

    const { messages } = this.state; 

    //Full signature of getCurrentPosition() API is
    //getCurrentPosition(geo_success, geo_error?, geo_options? )

    navigator.geolocation.getCurrentPosition( (position) => {

      const { coords: { latitude, longitude } } = position;

      console.log( latitude, longitude );

      this.setState({
       messages: [
        createLocationMessage({ latitude, longitude, }),
        ...messages 
        ],
      });

    }, () => Alert.alert('Location Error','Please ensure that location services are turned on for this app.') );
  };


  handleChangeFocus = ( isFocused ) => {
    this.setState( {isInputFocused: isFocused });
  }
  handleSubmit = ( text ) => {
    const { messages } = this.state;

    this.setState({ 
      messages: [ createTextMessage(text), ...messages ],
    });
  };

  dismissFullscreenImage = () => {
    this.setState( { fullscreenImageId: null } ); 
  }

  handlePressMessage = ({id,type}) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete message?',
          'Are you sure you want to delete this for ever and ever?',
          [
            { 
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const { messages } = this.state;
                this.setState( { messages: messages.filter( message => message.id !== id )});
              },
            },
          ],
        );
        break;

      case 'image':
        this.setState( { fullscreenImageId: id, isInputFocused: false, })
        break;

      default:
        break;
    }
  };

  renderFullscreenImage = () => {

    const { messages, fullscreenImageId } = this.state;

    if ( !fullscreenImageId ) return null;

    const image = messages.find( message => message.id === fullscreenImageId );

    if ( !image ) return null;

    const { uri } = image;
    console.log(uri);

    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullscreenImage}
      >
        <Image style={styles.fullscreenImage} source={{uri}} />
      </TouchableHighlight>
    );
  }


  renderMessageList = () => {

    const { messages } = this.state;



    return (
      <View style={styles.content}>
        <MessageList 
          messages = {messages}
          onPressMessage = {this.handlePressMessage}
        />
      </View>
      );
  }

  renderInputMethodEditor = () => {

    return (
      <View style={styles.inputMethodEditor}>
        <ImageGrid />
      </View>
      );
  }

  renderToolbar = () => {

    const { isInputFocused } = this.state;

    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused}
          onChangeFocus={this.handleChangeFocus}
          onSubmit={this.handleSubmit}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}
        />
      </View>
      );
  }

  componentWillMount() {

    this.subscription = BackHandler.addEventListener( 'hardwareBackPress', () => {
       const { fullscreenImageId } = this.state;

       if ( fullscreenImageId ) {
          this.dismissFullscreenImage();
          return true;
       }

       return false;
    });

  }

  componentWillUnmount(){
    this.subscription.remove();
  }


  render() {
    return (
      <View style={styles.container}>
        <Status />
        {this.renderMessageList()}
        {this.renderToolbar()}
        {this.renderInputMethodEditor()}
        {this.renderFullscreenImage()}
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'white',
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
