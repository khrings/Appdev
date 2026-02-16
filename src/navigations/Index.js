import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import Main from '../screens/Main';
import {NavigationContainer, Navigator} from '@react-navigation/native';

export default () => {
    return (
        <view>
            <NavigationContainer>
                <MainNav/>
            </NavigationContainer>

        </view>

    )
}