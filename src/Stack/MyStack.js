import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import GooglePageScreen from '../screens/GooglePageScreen';
import CategoryDetailsScreen from '../screens/CategoryDetailsScreen';
import Player from '../components/player/Player';
import ShowAd from '../screens/ShowAd';
import PrivacyPolicy from '../screens/PrivacyPolicy';

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="GooglePageScreen" component={GooglePageScreen} />
      <Stack.Screen
        name="CategoryDetailsScreen"
        component={CategoryDetailsScreen}
      />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="ShowAd" component={ShowAd} />
    </Stack.Navigator>
  );
}
