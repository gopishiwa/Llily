import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

// Currently the firebase auth through phone is not properly setup
// We have to use onAuthStateChanged() to complete the sign in which hasn't been setup

export default function useSignIn({}) {
	// for firebase user state
	// const [initializing, setInitializing] = useState(true);
	// const [user, setUser] = useState();

	const [confirm, setConfirm] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [code, setCode] = useState('');

	// Handle user state changes
	// function onAuthStateChanged(user) {
	// 	setUser(user);
	// 	if (initializing) setInitializing(false);
	//   }

	// const creatingSub = () => {
	// 	const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
	// 	return subscriber; // unsubscribe on unmount
	// }

	const signInwithNumber = async number => {
		setIsLoading(true);
		try {
			if (number.startsWith('0')) {
				number.replace('0', '');
			}
			const conformation = await auth().signInWithPhoneNumber(`+61${number}`);
			setConfirm(conformation);
			setIsLoading(false);
		} catch (err) {
			console.error(err);
			throw new Error('Signin Failed');
		}
	};

	const confirmCode = async () => {
		setIsLoading(true);
		try {
			await confirm.confirm(code);
			console.log(confirm);
			setIsLoading(false);
			const isError = false;
			return [isError, confirm];
		} catch (err) {
			setIsLoading(false);
			console.error(err);
			return 'Invalid code!';
		}
	};

	const onAuthStateChange = async () => {};

	useEffect(() => {}, []);
	return [code, isLoading, setCode, signInwithNumber, confirmCode];
}
