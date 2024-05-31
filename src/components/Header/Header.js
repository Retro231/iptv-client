import {
  Alert,
  Dimensions,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChannelsContext} from '../../Context/ChannelsContext';
import SingleStreamModal from '../Single_Stream/SingleStreamModal';
import {SearchContext} from '../../Context/SearchContext';
import {InterstitialAdManager} from 'react-native-fbads';
import {globalColors} from '../../globalStyles';

const Header = ({title, goBackTo}) => {
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [singleStreamModalVisible, setSingleStreamModalVisible] =
    useState(false);
  // const [searchText, setSearchText] = useState('');
  const {data, setData} = useContext(ChannelsContext);
  const {searchValue, setSearchValue} = useContext(SearchContext);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const textInputRef = useRef(null);

  // To focus searchTextInput
  useEffect(() => {
    if (textInputRef.current && isSearchClicked === true) {
      textInputRef.current.focus();
    }
  }, [isSearchClicked]);

  const navigation = useNavigation();
  const handleGoBack = () => {
    if (goBackTo === 'oneStep') {
      navigation.goBack(null);
    } else if (goBackTo === 'twoStep') {
      navigation.pap(2);
    } else if (goBackTo === 'home') {
      navigation.popToTop();
    }
  };
  // single stream
  const handleSingleStream = () => {
    setSingleStreamModalVisible(() => !singleStreamModalVisible);
  };

  // menu btn
  const handleMenu = () => {
    setMenuModalVisible(prev => !prev);
  };

  //search
  // const handleSearch = () => {
  //   setSearchModalVisible(prev => !prev);
  // };
  const handleSearchTextChange = text => {
    setSearchValue(text);
  };
  // const handleSearchBtn = () => {
  //   navigation.navigate('SearchResultScreen', {data: data, value: searchText});
  //   setSearchModalVisible(false);
  //   setSearchText('');
  // };

  const handleReset = async () => {
    setMenuModalVisible(!menuModalVisible);
    await AsyncStorage.clear();
    setData(null);
    navigation.navigate('Home');
  };

  const handleRateUs = () => {
    const URL = `https://play.google.com/store/apps/details?id=com.iptvusa.iptvapp`;

    Linking.canOpenURL(URL)
      .then(supported => {
        if (supported) {
          Linking.openURL(URL);
        } else {
          // Fallback to web URL
          Linking.openURL(
            `https://play.google.com/store/apps/details?id=com.iptvusa.iptvapp`,
          );
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  // ads
  useEffect(() => {
    // Interstitial Ad
    if (menuModalVisible) {
      InterstitialAdManager.showAd('948800379889675_948801323222914')
        .then(didClick => {})
        .catch(error => {
          console.log('err', error);
        });
    }
  }, [menuModalVisible]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerLeft}>
          {goBackTo && (
            <TouchableOpacity onPress={handleGoBack}>
              <Icon
                name="arrow-back"
                size={24}
                color={globalColors.primaryText}
              />
            </TouchableOpacity>
          )}

          <Text style={styles.logo}>{title}</Text>
        </View>
        <View style={styles.actionBtn}>
          {data !== null && (
            <>
              {/* <TextInput
              onChangeText={handleSearchTextChange}
              value={searchValue}
            /> */}
              <TouchableOpacity
                onPress={() => setIsSearchClicked(!isSearchClicked)}>
                <Icon
                  name="search"
                  size={24}
                  color={globalColors.primaryText}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSingleStream}>
                <Icon
                  name="play-circle"
                  size={24}
                  color={globalColors.primaryText}
                />
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={handleMenu}>
            <Icon name="more-vert" size={24} color={globalColors.primaryText} />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={menuModalVisible}
          onRequestClose={() => {
            setMenuModalVisible(!menuModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{
                  alignItems: 'flex-end',
                  borderColor: 'black',
                  borderWidth: 1,
                  position: 'absolute',
                  top: -35,
                  right: -30,
                  borderColor: 'white',
                  backgroundColor: '#ff7373',
                }}
                onPress={() => setMenuModalVisible(!menuModalVisible)}>
                <Icon name="close" size={24} color="white" />
              </TouchableOpacity>
              <Pressable onPress={handleReset}>
                <Text style={styles.menuItem}>Reset</Text>
              </Pressable>
              <Pressable onPress={handleRateUs}>
                <Text style={styles.menuItem}>Rate Us</Text>
              </Pressable>
              {/* <Pressable>
                <Text style={styles.menuItem}>More App</Text>
              </Pressable> */}
              <Pressable
                onPress={() => {
                  navigation.navigate('HowToUse');
                  setMenuModalVisible(false);
                }}>
                <Text style={styles.menuItem}>How to use</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('PrivacyPolicy');
                  setMenuModalVisible(false);
                }}>
                <Text style={styles.menuItem}>Privacy Policy</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* single stream */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={singleStreamModalVisible}
          onRequestClose={() => {
            setSingleStreamModalVisible(!singleStreamModalVisible);
          }}>
          <SingleStreamModal onClose={handleSingleStream} />
        </Modal>
      </View>

      {isSearchClicked && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: globalColors.primaryBackground,
            alignItems: 'center',
            position: 'relative',
          }}>
          <TextInput
            style={{
              borderWidth: 1,
              padding: 0,
              width: Dimensions.get('window').width - 50,
              borderColor: globalColors.primaryText,
              borderRadius: 10,
              paddingHorizontal: 10,
              color: globalColors.primaryText,
            }}
            ref={textInputRef}
            onChangeText={handleSearchTextChange}
            value={searchValue}
          />

          <TouchableOpacity
            onPress={() => {
              setIsSearchClicked(!isSearchClicked);
              setSearchValue('');
            }}>
            <Icon name="close" size={24} color={globalColors.primaryText} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: globalColors.primaryBackground,
    alignItems: 'center',
    position: 'relative',
  },
  headerLeft: {
    flexDirection: 'row',
    gap: 20,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: globalColors.primaryText,
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  menu: {
    position: 'absolute',
    top: 10,
    right: 0,
    zIndex: 999,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 44,
    backgroundColor: globalColors.primaryBackground,
    position: 'relative',
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    width: Dimensions.get('window').width - 100,
  },
  menuItem: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    margin: 5,
    color: globalColors.secondaryText,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: globalColors.primaryBackground,
    padding: 3,
    margin: 10,
    width: 250,
    borderRadius: 5,
    fontSize: 16,
  },
});
