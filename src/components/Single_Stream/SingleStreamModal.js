import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {InterstitialAdManager, NativeAdsManager} from 'react-native-fbads';
import {useNavigation} from '@react-navigation/native';
import AdComponent from '../adComponents/AdComponent';
const adsManager = new NativeAdsManager(
  'IMG_16_9_APP_INSTALL#948800379889675_949813169788396',
  2,
);
const SingleStreamModal = ({onClose}) => {
  const [url, setUrl] = useState('');
  const navigation = useNavigation();

  const handleUrl = value => {
    setUrl(value);
  };

  const onPlayBtnClick = () => {
    if (url.length > 0) navigation.navigate('Player', {streamUrl: url});
  };

  useEffect(() => {
    console.log(url);
  }, [url]);

  // ads
  useEffect(() => {
    // Interstitial Ad
    InterstitialAdManager.showAd(
      'IMG_16_9_APP_INSTALL#948800379889675_948801323222914',
    )
      .then(didClick => {})
      .catch(error => {
        console.log('err', error);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Pressable
          style={{
            alignItems: 'center',
            borderWidth: 1,
            backgroundColor: '#039EBD',
            borderColor: '#039EBD',
          }}
          onPress={onClose}>
          <Text style={{fontSize: 24, color: '#fff'}}>X</Text>
        </Pressable>
        <View style={styles.centeredView}>
          <Text style={styles.title}>Play Single Stream</Text>
          <View style={styles.textInput}>
            <Text style={styles.label}>Channel Name</Text>
            <TextInput style={styles.inputField}></TextInput>
          </View>
          <View style={styles.textInput}>
            <Text style={styles.label}>Channel Url</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={handleUrl}></TextInput>
          </View>
        </View>
        <View style={styles.actionBtn}>
          <Icon.Button
            name="play-circle"
            backgroundColor="#039EBD"
            iconStyle={{marginRight: 0}}
            onPress={onPlayBtnClick}>
            <Text
              style={{
                fontFamily: 'Arial',
                fontSize: 15,
                color: '#fff',
                fontWeight: 'bold',
                paddingHorizontal: 10,
              }}>
              Play
            </Text>
          </Icon.Button>
        </View>
        <View style={{justifyContent: 'center', margin: 10, marginTop: 20}}>
          <AdComponent adsManager={adsManager} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingleStreamModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredView: {
    padding: 25,
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#039EBD',
  },
  textInput: {
    gap: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#039EBD',
    borderRadius: 5,
    color: '#000',
  },
  actionBtn: {
    paddingHorizontal: 25,
    gap: 5,
    alignItems: 'center',
  },
});
