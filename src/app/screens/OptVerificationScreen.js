import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';

import StatusBar from '../components/StatusBar';
import WideTextInput from '../components/WideTextInput';
import WideBtn from '../components/WideBtn';

//OPT verification screen to enter the OPT Verification code
export default function OptVerificationScreen({ navigation, user }) {
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
						<Text style={style.text}>OPT Verification!</Text>
						<WideTextInput
							label={'Verification code'}
							placeholder={'Enter Code'}
							setText={() => console.log()}
							style={style.userName}
							hasError={hasLetter}
							text={'Invalid Username'}
						/>

						<WideBtn
							name={'Verify'}
							icon={'key'}
							btnStyle={style.btnLogin}
							disable={false}
							onPress={() => navigation.navigate('Register')}
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
	btnLogin: {
		width: 300,
		height: 60,
	},
	statusBar: {
		backgroundColor: 'rgba(0, 0, 0, 0)',
		color: '#000000',
		position: 'absolute',
	},
	text: {
		fontSize: 20,
		color: '#ffffff',
		fontWeight: '600',
		marginBottom: 300,
	},
});
