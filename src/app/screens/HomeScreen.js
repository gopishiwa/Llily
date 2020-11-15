import React from 'react';
import { View, StyleSheet } from 'react-native';
import WideBtn from '../components/WideBtn';

export default function HomeScreen({ navigation, user }) {
	const {
		number,
		setNumber,
		isUser,
		hasLetter,
		isGetting,
		setUser,
		removeUser,
	} = user;
	return (
		<View style={style.inner}>
			<WideBtn
				name={'Delete'}
				icon={'trash-bin-outline'}
				btnStyle={style.btnLogin}
				onPress={() => removeUser()}
			/>
		</View>
	);
}

const style = StyleSheet.create({
	inner: {
		flex: 1,
		justifyContent: 'center',
		left: '13%',
	},
	btnLogin: {
		width: 300,
		height: 60,
	},
});
