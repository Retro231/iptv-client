import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, Dimensions, StyleSheet, View} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import BannerAd from '../adComponents/BannerAd';
import Orientation from 'react-native-orientation-locker';
import {InterstitialAdManager} from 'react-native-fbads';

const Player = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {streamUrl, title} = route.params;

  const [fullScreen, setFullScreen] = useState(false);

  const handleOnBack = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          Orientation.lockToPortrait();
          navigation.goBack(null);

          // show ad
          InterstitialAdManager.showAd('948800379889675_948801323222914')
            .then(didClick => {})
            .catch(error => {
              console.log('err', error);
            });
        },
      },
    ]);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleOnBack,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <VideoPlayer
          onBack={handleOnBack}
          source={{
            uri: `${streamUrl}`,
          }}
          title={title}
          // fullScreen={handleFullScreen}
          isFullscreen={true}
          onEnterFullscreen={() => {
            Orientation.lockToLandscape();
            setFullScreen(true);
          }}
          onExitFullscreen={() => {
            Orientation.lockToPortrait();
            setFullScreen(false);
          }}
        />
      </View>
      {/* banner ad */}
      {!fullScreen && (
        <BannerAd placement_id={'948800379889675_948801103222936'} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default Player;
