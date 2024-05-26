import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import WebView from 'react-native-webview';
import Header from '../Header/Header';

const CardWebView = ({route}) => {
  const webViewRef = useRef(null);
  const {mainUri} = route.params;

  return (
    <View style={{flex: 1}}>
      <Header goBackTo={'oneStep'} />
      <WebView
        ref={webViewRef}
        source={{uri: mainUri}}
        // onLoad={handleSourceUrlLoad}
        style={{flex: 1}}
        scrollEnabled={true} // Allow scrolling
        // onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        maximumZoomScale={1} // Set maximum zoom level
        minimumZoomScale={1} // Set minimum zoom level
        startInLoadingState={true}
        // onLoadEnd={handleLoadEnd}
      />
    </View>
  );
};

export default CardWebView;

const styles = StyleSheet.create({});
