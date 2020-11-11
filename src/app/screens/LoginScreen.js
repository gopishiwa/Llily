import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import StatusBar from '../components/StatusBar';
import WideBtn from '../components/WideBtn';
// Login Screen for login
const userName = '';
const number = '';
export default function LoginScreen({ navigation }) {
	return (
		<>
			<StatusBar
				navigation={navigation}
				title={'Login'}
				backScreen={'Welcome'}
			/>
			<TextInput
				placeholder={'Username'}
				onChangeText={text => (text = userName)}
				style={style.userName}
			/>
			<TextInput
				placeholder={'Phone Number'}
				keyboardType={'number-pad'}
				onChangeText={text => (text = number)}
				style={style.number}
			/>
			<WideBtn
				name={'login'}
				icon={'key'}
				btnStyle={style.btnLogin}
				disable={userName && number ? false : true}
			/>
		</>
	);
}

const style = StyleSheet.create({
	userName: {
		position: 'absolute',
		width: 300,
		height: 60,
		left: 50,
		top: 500,
	},
	number: {
		position: 'absolute',
		width: 300,
		height: 60,
		left: 50,
		top: 568,
		borderColor: '#644999',
	},
	btnLogin: {
		position: 'absolute',
		left: 50,
		top: 650,
	},
});
