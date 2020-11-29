import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import WideBtn from '../components/WideBtn';
import StatusBar from '../components/StatusBar';

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
		<>
			<StatusBar
				title={'Welcome'}
				action={
					<Appbar.Action
						icon={'settings-outline'}
						color={'#644999'}
						onPress={() => navigation.navigate('settings')}
					/>
				}
			/>
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
		</>
	);
}

const style = StyleSheet.create({
	inner: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
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
