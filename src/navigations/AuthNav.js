import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from '../utils/routes';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.LOGIN}>
      <Stack.Screen name={SCREENS.LOGIN} component={Login} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.REGISTER} component={Register} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;