import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

import StatusBar from '../components/StatusBar';
import WideBtn from '../components/WideBtn';

// Login Screen for login
export default function LoginScreen({ navigation }) {
	const [userName, setUserName] = useState('');
	const [number, setNumber] = useState('');

	function hasLetter() {
		return !number.match(/\D/) ? false : true;
	}

	function hasSpecialChar() {
		return false;
	}

	return (
		<>
			<StatusBar navigation={navigation} backScreen={'Welcome'} />
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={style.inner}>
						<Text style={style.text}>Log In!</Text>
						<TextInput
							value={userName}
							label={'Username'}
							placeholder={'Enter Username'}
							mode={'outlined'}
							onChangeText={text => setUserName(text)}
							style={style.userName}
						/>
						<HelperText
							type={'error'}
							visible={hasSpecialChar()}
							style={{ left: 50 }}>
							Invalid Username
						</HelperText>
						<TextInput
							value={number}
							label={'Phone Number'}
							placeholder={'Enter Phone Number'}
							mode={'outlined'}
							keyboardType={'phone-pad'}
							onChangeText={text => setNumber(text)}
							style={style.number}
						/>
						<HelperText
							type={'error'}
							visible={hasLetter()}
							style={{ left: 50 }}>
							Invalid Phone Number.
						</HelperText>
						<WideBtn
							name={'login'}
							icon={'key'}
							btnStyle={style.btnLogin}
							disable={
								userName && number && (!hasLetter() || !hasSpecialChar())
									? false
									: true
							}
							onPress={() => console.log('pressed login')}
						/>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</>
	);
}

const style = StyleSheet.create({
	inner: {
		flex: 1,
		justifyContent: 'space-around',
	},
	userName: {
		width: 300,
		height: 60,
		left: 50,
		marginBottom: 0,
	},
	number: {
		width: 300,
		height: 60,
		left: 50,
		marginBottom: 0,
	},
	btnLogin: {
		position: 'relative',
		left: 50,
	},
	statusBar: {
		backgroundColor: 'rgba(0, 0, 0, 0)',
		color: '#000000',
	},
	text: {
		fontFamily: 'SF Pro Text',
		fontStyle: 'normal',
		fontSize: 50,
		color: '#ffffff',
		fontWeight: '600',
		marginTop: 0,
		left: 50,
	},
});
