import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { createStackNavigator, StackView } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function HomeStack({ user }) {
	return (
		<Stack.Navigator
			initialRouteName={'Home'}
			headerMode={'none'}
			screenOptions={{}}>
			<Stack.Screen name={'Home'}>
				{props => (
					<ImageBackground
						source={require('../../assets/background.png')}
						style={style.image}>
						<HomeScreen {...props} user={user} />
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
