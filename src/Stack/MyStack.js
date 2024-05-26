import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import GooglePageScreen from '../screens/GooglePageScreen';
import CategoryDetailsScreen from '../screens/CategoryDetailsScreen';
import Player from '../components/player/Player';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import HowToUse from '../screens/HowToUse';
import CardWebView from '../components/cardwebview/CardWebView';

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
      <Stack.Screen name="HowToUse" component={HowToUse} />
      <Stack.Screen name="CardWebView" component={CardWebView} />
    </Stack.Navigator>
  );
}
