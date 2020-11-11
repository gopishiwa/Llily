import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import StatusBar from '../components/StatusBar';
import WideBtn from '../components/WideBtn';
// Register Screen for register new accounts
export default function RegisterScreen({ navigation }) {
	const [userName, setUserName] = useState('');
	const [number, setNumber] = useState('');
	return (
		<>
			<StatusBar navigation={navigation} backScreen={'Welcome'} />
			<TextInput
				label={'Username'}
				placeholder={'Enter Username'}
				mode={'outlined'}
				onChangeText={text => setUserName(text)}
				style={style.userName}
			/>
			<TextInput
				label={'Phone Number'}
				placeholder={'Enter Phone Number'}
				mode={'outlined'}
				keyboardType={'number-pad'}
				onChangeText={text => setNumber(text)}
				style={style.number}></TextInput>
			<WideBtn
				name={'Register'}
				icon={'person'}
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
		top: 450,
	},
	number: {
		position: 'absolute',
		width: 300,
		height: 60,
		left: 50,
		top: 530,
		borderColor: '#644999',
	},
	btnLogin: {
		position: 'absolute',
		left: 50,
		top: 650,
	},
});
