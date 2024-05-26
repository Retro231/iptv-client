import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChannelCard from '../components/ChannelCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SearchContext} from '../Context/SearchContext';
import {getMergedChannels} from '../helper/getMergedChannels';
import {getChannels} from '../helper/getChannels';
const headItem = [
  {
    id: 1,
    name: 'Channel',
    iconName: 'playlist-play',
    iconSize: 22,
  },
  {
    id: 2,
    name: 'Favourite',
    iconName: 'favorite',
    iconSize: 20,
  },
];

const CategoryDetailsScreen = ({data}) => {
  const [active, setActive] = useState(1);
  const [channels, setChannels] = useState([]);
  const [favChannels, setFavChannels] = useState([]);
  const {searchValue, setSearchValue} = useContext(SearchContext);
  const [refresh, setRefresh] = useState(false);
  // update
  const [mainList, setMainList] = useState([]);

  const getStoredChannels = async () => {
    const data = await AsyncStorage.getItem('channels');
    setChannels(JSON.parse(data));
    setMainList(JSON.parse(data)); // very first mainlist
    const favData = JSON.parse(data).filter(
      channel => channel.favourite === true,
    );
    setFavChannels(favData);
    return JSON.parse(data);
  };

  const storeChannels = async value => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('channels', jsonValue);
  };

  useEffect(() => {
    getStoredChannels();
    // console.log(prevData);
    // setChannels(prevData data);
  }, []);

  // update channel with favourite propertry
  const updateChannels = async (data, item) => {
    data.forEach(channel => {
      if (channel.tvgId === item.tvgId && channel.title === item.title) {
        if (channel.hasOwnProperty('favourite')) {
          if (channel.favourite === true) {
            channel.favourite = false;
          } else {
            channel.favourite = true;
          }
        } else {
          channel.favourite = true;
        }
      }
    });
    return data;
  };

  // arr1 - updated list, arr2 - prev list
  const mergeArray = async (arr1, arr2) => {
    const mergedArray = [];

    // Create a map from arr1 for faster lookup
    const mapArr1 = new Map(arr1.map(item => [item.tvgId, item]));

    // Iterate through arr2
    arr2.forEach(item2 => {
      const tvgId = item2.tvgId;
      const item1 = mapArr1.get(tvgId); // Get corresponding item from arr1

      if (item1) {
        // If the item exists in arr1
        const mergedItem = {...item2, ...item1}; // Merge properties, giving priority to item1
        mergedArray.push(mergedItem);
      } else {
        // If the item doesn't exist in arr1, just push item2
        mergedArray.push(item2);
      }
    });

    return mergedArray;
  };

  // activate when user click on fav icon.
  const handleToggleFavourite = async item => {
    let displayedChannels = searchValue.length < 0 ? channels : mainList;
    const data = await updateChannels(displayedChannels, item);
    setMainList(data);
    // console.log('Data', data);
    // console.log('Channel', channels);

    // before setupdatedchannels marge prev channel with newone.
    let mergedArray = await mergeArray(data, channels);
    // console.log(mergedArray);
    setChannels(mergedArray);

    const favData = mergedArray.filter(channel => channel.favourite === true);
    setFavChannels(favData);
    // console.log(favData);
    // console.log(data);

    await storeChannels(mergedArray);
  };

  const handlePress = id => {
    setActive(id);
  };

  // search

  const filterSearch = async (array, value) => {
    const filteredData = array.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase()),
    );
    return filteredData;
  };

  const handleSearch = async () => {
    if (searchValue.length > 0) {
      const searchResult = await filterSearch(mainList, searchValue);
      setMainList(searchResult);
    } else {
      setMainList(channels);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  // pull func
  const pullMe = async () => {
    setRefresh(true);
    const newData = await getChannels();
    const updatedData = await getMergedChannels(newData, channels);
    setChannels(updatedData);
    setMainList(updatedData);
    storeChannels(updatedData);
    setRefresh(false);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.categorayHead}>
        {headItem.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(item.id)}
            style={[
              styles.headItem,
              {
                backgroundColor: active === item.id ? '#039EBD' : '#d4d4d4',
              },
            ]}>
            <Icon
              name={item.iconName}
              size={item.iconSize}
              color={active === item.id ? '#fff' : '#039EBD'}
            />
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: active === item.id ? '#fff' : '#039EBD',
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.contentWrapper}>
        <FlatList
          data={active === 1 ? mainList : favChannels}
          numColumns={2}
          horizontal={false}
          renderItem={({item}) => (
            <ChannelCard data={item} toggleFavourite={handleToggleFavourite} />
          )}
          keyExtractor={item => item.tvgId}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
          }
        />
      </View>
    </View>
  );
};

export default CategoryDetailsScreen;

const styles = StyleSheet.create({
  categorayHead: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
  headItem: {
    backgroundColor: 'gray',
    width: Dimensions.get('window').width / headItem.length,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
  },
});
