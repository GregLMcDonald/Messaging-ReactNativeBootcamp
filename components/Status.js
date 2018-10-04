/** @format */

import React from "react";
import {
  NetInfo,
  View,
  Text,
  Platform,
  StatusBar,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";

import { Constants } from "expo";

export default class Status extends React.Component {
  state = {
    info: null
  };

  async componentWillMount() {
    this.subscription = NetInfo.addEventListener("connectionChange", status => {
      this.handleChange;
    });

    const info = await NetInfo.getConnectionInfo();
    this.setState({ info: info.type });

    //setTimeout( () => this.handleChange('none'), 3000 );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  handleChange = info => {
    this.setState({ info: info.type });
  };

  render() {
    const { info } = this.state;

    const isConnected = info !== "none";
    const backgroundColor = isConnected ? "white" : "red";

    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? "dark-content" : "light-content"}
        animated={false}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents={"none"}>
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
          </View>
        )}
      </View>
    );

    if (Platform.OS === "ios") {
      return (
        <View style={[styles.status, { backgroundColor }]}>
          {messageContainer}
        </View>
      );
    }

    return messageContainer;
  }
}

const statusHeight = Platform.OS === "ios" ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  messageContainer: {
    zIndex: 1,
    position: "absolute",
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: "center"
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "red"
  },
  text: {
    color: "white"
  },
  status: {
    zIndex: 1,
    height: statusHeight
  }
});
