import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const InternetInfo = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#039EBD',
      }}>
      <Text style={{fontSize: 24, color: '#fff', fontWeight: 'bold'}}>
        No Internet Connection!!
      </Text>
      <Text style={{fontSize: 18, color: '#fff'}}>
        Please check you internet connection.
      </Text>
    </View>
  );
};

export default InternetInfo;

const styles = StyleSheet.create({});
