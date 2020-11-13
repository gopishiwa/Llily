import React, { useEffect } from 'react';
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

var isLoading = true;

//OPT verification screen to enter the OPT Verification code
export default function OptVerificationScreen({ navigation, user, signIn }) {
	const { number } = user;
	const { code, setCode, signInwithNumber, confirmCode } = signIn;
	const hasLetter = () => {
		return !code.match(/\D/) ? false : true;
	};
	async function signInCall() {
		try {
			console.log(number);
			await signInwithNumber(number);
			isLoading = false;
		} catch (err) {
			isLoading = false;
			throw new Error('Sign in error');
		}
	}

	useEffect(() => {
		signInCall();
	}, []);
	return (
		<>
			<StatusBar navigation={navigation} resetHook={setCode} />
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={style.inner}>
						<Text style={style.text}>OPT Verification!</Text>
						<WideTextInput
							label={'Verification code'}
							placeholder={'Enter Code'}
							setText={setCode}
							style={style.optCode}
							hasError={hasLetter}
							text={'Invalid Code'}
						/>

						<WideBtn
							name={'Verify'}
							icon={'key'}
							btnStyle={style.btnLogin}
							disable={code && !hasLetter() && !isLoading ? false : true}
							onPress={() => confirmCode()}
							loading={isLoading}
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
	optCode: {
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
		fontSize: 40,
		color: '#ffffff',
		fontWeight: '600',
		marginBottom: 395,
	},
});
