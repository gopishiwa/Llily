import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';

const backgroundImgPath = '../../assets/background.png';
// Welcome Screen initial screen when the app first starts
export default function WelcomeScreen({ navigation }) {
	return (
		<View>
			<Button
				icon="key"
				mode="contained"
				style={style.btnLogin}
				labelStyle={style.btnText}
				onPress={() => navigation.navigate('Login')}>
				log in
			</Button>
			<Button
				icon="person"
				mode="contained"
				style={style.btnRegister}
				labelStyle={style.btnText}
				onPress={() => navigation.navigate('Register')}>
				register
			</Button>
		</View>
	);
}

const style = StyleSheet.create({
	btnLogin: {
		position: 'absolute',
		width: 298,
		height: 62,
		left: 52,
		top: 568,
	},
	btnRegister: {
		position: 'absolute',
		width: 298,
		height: 62,
		left: 52,
		top: 666,
	},
	btnText: {
		fontFamily: 'SF Pro Text',
		fontStyle: 'normal',
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center',
	},
});
