import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import LoginStack from './stack/LoginStack';

import firebase from '../common/config/firebase.config';

export default function App() {
	return (
		<>
			<NavigationContainer>
				<LoginStack />
			</NavigationContainer>
		</>
	);
}
