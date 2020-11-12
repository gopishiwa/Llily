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
import WideTextInput from '../components/WideTextInput';

// Login Screen for login
export default function RegisterScreen({ navigation, user }) {
	const {
		userName,
		setUserName,
		number,
		setNumber,
		hasLetter,
		hasSpecialChar,
	} = user;

	return (
		<>
			<StatusBar navigation={navigation} backScreen={'Welcome'} />
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={style.inner}>
						<Text style={style.text}>Register!</Text>
						<WideTextInput
							label={'Username'}
							placeholder={'Enter Username'}
							icon={'person-outline'}
							setText={setUserName}
							style={style.userName}
							hasError={hasSpecialChar}
							text={'Invalid Username'}
						/>
						<WideTextInput
							label={'Phone Number'}
							placeholder={'Enter Phone Number'}
							icon={'call-outline'}
							setText={setNumber}
							keyboardType={'phone-pad'}
							style={style.number}
							hasError={hasLetter}
							text={'Invalid Phone Number'}
						/>

						<WideBtn
							name={'register'}
							icon={'person'}
							btnStyle={style.btnRegister}
							disable={
								false /*
								userName && number && !hasLetter() && !hasSpecialChar()
									? false
									: true 
								*/
							}
							onPress={() => navigation.navigate('OptVerification')}
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
		justifyContent: 'center',
		left: 50,
	},
	userName: {
		width: 300,
		height: 60,
	},
	number: {
		width: 300,
		height: 60,
	},
	btnRegister: {
		width: 300,
		height: 60,
		marginTop: 10,
	},
	statusBar: {
		backgroundColor: 'rgba(0, 0, 0, 0)',
		color: '#000000',
		position: 'absolute',
	},
	text: {
		fontSize: 50,
		color: '#ffffff',
		fontWeight: '600',
		marginBottom: 300,
	},
});
