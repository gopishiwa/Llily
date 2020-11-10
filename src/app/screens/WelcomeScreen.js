import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function WelcomeScreen({ navigation }) {
	return (
		<View>
			<Button
				icon="key"
				mode="contained"
				style={style.loginBtn}
				labelStyle={style.loginBtn}>
				log in
			</Button>
			<Button
				icon="person"
				mode="contained"
				style={style.btnRegister}
				labelStyle={style.btnLogin}>
				register
			</Button>
		</View>
	);
}

const style = StyleSheet.create({
	btnLogin: {
		position: 'absolute',
		width: '298px',
		height: '62px',
		left: '52px',
		top: '568px',
	},
	btnRegister: {},
	btnText: {
		fontFamily: 'SF Pro Text',
		fontStyle: 'normal',
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center',
	},
});
