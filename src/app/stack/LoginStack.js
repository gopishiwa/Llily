import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { createStackNavigator, StackView } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OptVerificationScreen from '../screens/OptVerificationScreen';

const Stack = createStackNavigator();
//Login Stack for management of the conected screens for login and register
export default function LoginStack({ user, signIn }) {
	return (
		<Stack.Navigator
			initialRouteName="Welcome"
			headerMode="none"
			screenOptions={{}}>
			<Stack.Screen name="Welcome">
				{props => (
					<ImageBackground
						source={require('../../assets/background.png')}
						style={style.image}>
						<WelcomeScreen {...props} user={user} />
					</ImageBackground>
				)}
			</Stack.Screen>
			<Stack.Screen name="Login">
				{props => (
					<ImageBackground
						source={require('../../assets/background.png')}
						style={style.image}>
						<LoginScreen {...props} user={user} />
					</ImageBackground>
				)}
			</Stack.Screen>
			<Stack.Screen name="Register">
				{props => (
					<ImageBackground
						source={require('../../assets/background.png')}
						style={style.image}>
						<RegisterScreen {...props} user={user} />
					</ImageBackground>
				)}
			</Stack.Screen>
			<Stack.Screen name="OptVerification">
				{props => (
					<ImageBackground
						source={require('../../assets/background.png')}
						style={style.image}>
						<OptVerificationScreen {...props} user={user} signIn={signIn} />
					</ImageBackground>
				)}
			</Stack.Screen>
		</Stack.Navigator>
	);
}

const style = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
});
