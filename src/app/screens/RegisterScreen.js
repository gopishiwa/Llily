import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import StatusBar from '../components/StatusBar';
// Register Screen for register new accounts
export default function RegisterScreen({ navigation }) {
	return (
		<>
			<StatusBar
				navigation={navigation}
				title={'Register'}
				backScreen={'Welcome'}
			/>
		</>
	);
}
