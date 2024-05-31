import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import Header from '../Header/Header';
import {useNavigation} from '@react-navigation/native';

const CardWebView = ({route}) => {
  const webViewRef = useRef(null);
  const {mainUri} = route.params;
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

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
