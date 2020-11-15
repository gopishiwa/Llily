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
				name={'Sign PDF'}
				icon={'pencil'}
				btnStyle={style.btnSign}
				onPress={() => navigation.navigate('PDF Screen')}
			/>
			<WideBtn
				name={'Delete'}
				icon={'trash-bin-outline'}
				btnStyle={style.btnDelete}
				onPress={() => removeUser()}
			/>
		</View>
	);
}

const style = StyleSheet.create({
	inner: {
		flex: 1,
		justifyContent: 'flex-end',
		left: '13%',
	},
	btnSign: {
		width: 300,
		height: 60,
		marginBottom: '5%',
	},
	btnDelete: {
		width: 300,
		height: 60,
		marginBottom: '30%',
	},
});
