import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';

import WideBtn from '../components/WideBtn';

// Welcome Screen initial screen when the app first starts
export default function WelcomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1 }}>
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
		left: 50,
		width: 300,
		height: 60,
	},
	btnRegister: {
		left: 50,
		width: 300,
		height: 60,
	},
	welcomeText: {
		fontFamily: 'SF Pro Text',
		fontStyle: 'normal',
		fontSize: 50,
		color: '#ffffff',
		fontWeight: '600',
		left: 50,
		top: 100,
	},
});
