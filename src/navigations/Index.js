import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNav from './AuthNav';

export default () => {
    return (
        <NavigationContainer>
            <AuthNav/>
        </NavigationContainer>
    )
}