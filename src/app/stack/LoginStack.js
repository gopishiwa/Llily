import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import OptVerificationScreen from '../screens/OptVerificationScreen';

const Stack = createStackNavigator();

export default function LoginStack() {
	return (
		<View>
			<Stack.Navigator initialRouteName="Welcome">
				<Stack.Screen name="Welcome" component={WelcomeScreen} />
			</Stack.Navigator>
		</View>
	);
}
