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

//OPT verification screen to enter the OPT Verification code
export default function OptVerificationScreen({ navigation, user, signIn }) {
	const { number, setNumber, isUser, isGetting, setUser, removeUser } = user;
	const { code, isLoading, setCode, signInwithNumber, confirmCode } = signIn;
	const hasLetter = () => {
		return !code.match(/\D/) ? false : true;
	};
	async function signInCall() {
		try {
			console.log(number);
			await signInwithNumber(number);
		} catch (err) {
			console.error(err);
			navigation.goBack();
			throw new Error('Sign in error');
		}
	}

	useEffect(() => {
		signInCall();
	}, []);
	return (
		<>
			<StatusBar
				title={'OPT Verification'}
				navigation={navigation}
				resetHook={setCode}
			/>
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
							keyboardType={'numeric'}
						/>

						<WideBtn
							name={'Verify'}
							icon={'key'}
							btnStyle={style.btnLogin}
							disable={code && !hasLetter() && !isLoading ? false : true}
							onPress={async () => {
								const [isError, confirm]= await confirmCode();
								if (!isError) {
									console.log(code);
									setUser(confirm);
								}
							}}
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
		left: '13%',
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
	text: {
		fontSize: 40,
		color: '#ffffff',
		fontWeight: '600',
		marginBottom: 395,
	},
});
