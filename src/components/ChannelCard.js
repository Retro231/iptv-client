import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// title,
// tvgId,
// tvgLogo,
// groupTitle,
// streamUrl,

const ChannelCard = ({data, toggleFavourite}) => {
  const {title, tvgId, tvgLogo, groupTitle, streamUrl, favourite, type} = data;
  const navigation = useNavigation();
  const handleCardPress = () => {
    if (type === 'web') {
      navigation.navigate('CardWebView', {mainUri: streamUrl});
    } else if (type === 'custom') {
      const URL = streamUrl;

      Linking.canOpenURL(URL)
        .then(supported => {
          if (supported) {
            Linking.openURL(URL);
          } else {
            // Fallback to web URL
            Linking.openURL(URL);
          }
        })
        .catch(err => console.error('An error occurred', err));
    } else {
      navigation.navigate('Player', {
        streamUrl,
        title,
      });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleCardPress}
      style={styles.card}>
      <Image
        style={{backgroundColor: 'black'}}
        source={{
          uri: tvgLogo,
        }}
        width={Dimensions.get('screen').width / 2 - 6}
        height={100}
        resizeMode="center"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
          gap: 4,
        }}>
        <View style={{width: '90%', gap: 2}}>
          <Text
            numberOfLines={2}
            style={{fontWeight: 'bold', color: '#fff', textAlign: 'left'}}>
            {title}
          </Text>
          <Text style={{fontWeight: 'normal', color: '#fff'}}>
            {groupTitle}
          </Text>
        </View>

        <View style={{width: '10%'}}>
          <TouchableOpacity onPress={() => toggleFavourite(data)}>
            <Icon
              name={'favorite'}
              size={18}
              color={favourite === true ? 'red' : '#fff'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChannelCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#039EBD',
    margin: 2,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1.5,

    width: Dimensions.get('screen').width / 2 - 6,
  },
});
