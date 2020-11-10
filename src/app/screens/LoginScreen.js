import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import StatusBar from '../components/StatusBar';
// Login Screen for login 
export default function LoginScreen({ navigation }) {
	return (
		<>
			<StatusBar
				navigation={navigation}
				title={'Login'}
				backScreen={'Welcome'}
			/>
		</>
	);
}
