import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeAdsManager} from 'react-native-fbads';
import AdComponent from '../components/adComponents/AdComponent';
import Header from '../components/Header/Header';
const {width, height} = Dimensions.get('window');
const adsManager = new NativeAdsManager(
  'IMG_16_9_APP_INSTALL#948800379889675_949813169788396',
  2,
);
const ShowAd = () => {
  return (
    <View style={{width: width, height: height, backgroundColor: 'silver'}}>
      <Header />
      {/* native ad */}
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: '#fff',
          padding: 20,
        }}>
        <AdComponent adsManager={adsManager} adChoicePosition="bottomRight" />
      </View>
    </View>
  );
};

export default ShowAd;

const styles = StyleSheet.create({});
