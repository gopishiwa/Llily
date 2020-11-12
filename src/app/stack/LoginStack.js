import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { createStackNavigator, StackView } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OptVerificationScreen from '../screens/OptVerificationScreen';

import BackgroundImg from '../components/BackgroundImg';
import { StackActions } from '@react-navigation/native';

const Stack = createStackNavigator();
//Login Stack for management of the conected screens for login and register
export default function LoginStack({ user }) {
	return (
		<ImageBackground
			source={require('../../assets/background.png')}
			style={style.image}>
			<Stack.Navigator
				initialRouteName="Welcome"
				headerMode="none"
				screenOptions={{
					cardStyle: { backgroundColor: 'transparent' },
				}}>
				<Stack.Screen name="Welcome">
					{props => <WelcomeScreen {...props} user={user} />}
				</Stack.Screen>
				<Stack.Screen name="Login">
					{props => <LoginScreen {...props} user={user} />}
				</Stack.Screen>
				<Stack.Screen name="Register">
					{props => <RegisterScreen {...props} user={user} />}
				</Stack.Screen>
				<Stack.Screen name="OptVerification">
					{props => <OptVerificationScreen {...props} user={user} />}
				</Stack.Screen>
			</Stack.Navigator>
		</ImageBackground>
	);
}

const style = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
});
