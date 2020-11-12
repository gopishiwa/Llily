import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';

import WideBtn from '../components/WideBtn';

// Welcome Screen initial screen when the app first starts
export default function WelcomeScreen({ navigation, user }) {
	return (
		<View style={{ flex: 1, justifyContent: 'center', left: 50 }}>
			<Text style={style.welcomeText}>Welcome!</Text>
			<WideBtn
				name={'login'}
				icon={'key'}
				onPress={() => navigation.navigate('Login')}
				btnStyle={style.btnLogin}
			/>
			<WideBtn
				name={'register'}
				icon={'person'}
				onPress={() => navigation.navigate('Register')}
				btnStyle={style.btnRegister}
			/>
		</View>
	);
}

const style = StyleSheet.create({
	btnLogin: {
		width: 300,
		height: 60,
		marginBottom: 20,
	},
	btnRegister: {
		width: 300,
		height: 60,
	},
	welcomeText: {
		fontSize: 50,
		color: '#ffffff',
		fontWeight: '600',
		marginBottom: 350,
	},
});
