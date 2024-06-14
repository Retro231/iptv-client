import {
  ActivityIndicator,
  BackHandler,
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import InAppReview from 'react-native-in-app-review';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SingleStreamModal from '../components/Single_Stream/SingleStreamModal';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryDetailsScreen from './CategoryDetailsScreen';
import {ChannelsContext} from '../Context/ChannelsContext';
import {getChannels} from '../helper/getChannels';
import {getMergedChannels} from '../helper/getMergedChannels';
import BannerAd from '../components/adComponents/BannerAd';
import {globalColors, globalVariables} from '../global';
const Home = () => {
  const navigation = useNavigation();
  const {data, setData} = useContext(ChannelsContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(() => !showModal);
  };

  const checkPlaylist = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('channels');
      // console.log(JSON.parse(jsonValue));
      if (jsonValue !== null) {
        // fatch new channelsArray from api.
        const newData = await getChannels();
        const storedData = JSON.parse(jsonValue);
        // compare with stored channelsArray.
        // check channel name and id, if found ,, modify new channels array with favourite property of stored channelsArray.
        const margedArray = await getMergedChannels(newData, storedData);
        // console.log(newData[0]);
        // console.log(storedData[0]);
        // console.log(margedArray[0]);
        setData(margedArray);
        await AsyncStorage.setItem('channels', JSON.stringify(margedArray));
      }

      setLoading(false);
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    checkPlaylist();
  }, []);

  const handleRefresh = () => {
    checkPlaylist();
  };

  const handleSeachChannels = () => {
    navigation.navigate('GooglePageScreen');
  };
  // const handleReview = () => {
  //   // Give you result if version of device supported to rate app or not!
  //   InAppReview.isAvailable();

  //   // trigger UI InAppreview
  //   InAppReview.RequestInAppReview()
  //     .then(hasFlowFinishedSuccessfully => {
  //       // when return true in android it means user finished or close review flow
  //       console.log('InAppReview in android', hasFlowFinishedSuccessfully);

  //       // when return true in ios it means review flow lanuched to user.
  //       console.log(
  //         'InAppReview in ios has launched successfully',
  //         hasFlowFinishedSuccessfully,
  //       );

  //       // 1- you have option to do something ex: (navigate Home page) (in android).
  //       // 2- you have option to do something,
  //       // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

  //       // 3- another option:
  //       if (hasFlowFinishedSuccessfully) {
  //         // do something for ios
  //         // do something for android
  //       }

  //       // for android:
  //       // The flow has finished. The API does not indicate whether the user
  //       // reviewed or not, or even whether the review dialog was shown. Thus, no
  //       // matter the result, we continue our app flow.

  //       // for ios
  //       // the flow lanuched successfully, The API does not indicate whether the user
  //       // reviewed or not, or he/she closed flow yet as android, Thus, no
  //       // matter the result, we continue our app flow.
  //     })
  //     .catch(error => {
  //       //we continue our app flow.
  //       // we have some error could happen while lanuching InAppReview,
  //       // Check table for errors and code number that can return in catch.
  //       console.log(error);
  //     });
  // };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'USA NEWS IPTV'} refreshData={handleRefresh} />
      {!loading && data === null && (
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: globalColors.secondaryText,
            }}>
            No Playlist Added
          </Text>
          <Icon
            name={'search'}
            size={32}
            color={globalColors.primaryBackground}
          />
          <Text style={{color: globalColors.secondaryText}}>
            Click on "Search Playlist" and select suitable website
          </Text>
          <Icon.Button
            name="live-tv"
            backgroundColor={globalColors.primaryBackground}
            onPress={handleSeachChannels}>
            <Text
              style={{
                fontFamily: 'Arial',
                fontSize: 15,
                color: globalColors.primaryText,
              }}>
              Search Playlist
            </Text>
          </Icon.Button>
          <Icon.Button
            name="play-circle"
            backgroundColor={globalColors.primaryBackground}
            onPress={toggleModal}>
            <Text
              style={{
                fontFamily: 'Arial',
                fontSize: 15,
                color: globalColors.primaryText,
              }}>
              Play Single Stream
            </Text>
          </Icon.Button>
          {/* modal signle stream */}
          <Modal
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
            }}
            visible={showModal}
            animationType="fade"
            onRequestClose={toggleModal}>
            <SingleStreamModal onClose={toggleModal} />
          </Modal>
        </View>
      )}
      {!loading && data !== null && <CategoryDetailsScreen />}
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <ActivityIndicator
            size="large"
            color={globalColors.primaryBackground}
          />
        </View>
      )}
      {/* banner ad */}
      <BannerAd placement_id={globalVariables.BannerAdId} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
