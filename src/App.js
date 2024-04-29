import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {MyStack} from './Stack/MyStack';
import {ChannelsContext} from './Context/ChannelsContext';
import NetInfo from '@react-native-community/netinfo';
import InternetInfo from './screens/InternetInfo';
import {SearchContext} from './Context/SearchContext';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [netOk, setNetOk] = useState(false);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      setNetOk(state.isConnected);
      SplashScreen.hide();
    });

    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  //OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize('e17486f5-e895-4ae2-bfc9-470cbaded3df');

  // Also need enable notifications to complete OneSignal setup
  // OneSignal.Notifications.requestPermission(true);

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <ChannelsContext.Provider value={{data, setData}}>
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
              <StatusBar />
              {netOk ? <MyStack /> : <InternetInfo />}
            </SearchContext.Provider>
          </ChannelsContext.Provider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
