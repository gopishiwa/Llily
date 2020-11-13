import { useState, useEffet } from 'react';
import auth from '@react-native-firebase/auth';

export default function useSignIn({}) {
	const [confirm, setConfirm] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [code, setCode] = useState('');

	const signInwithNumber = async number => {
		setIsLoading(true);
		try {
			if (number.startsWith('0')) {
				number.replace('0', '');
			}
			const conformation = await auth().signInWithPhoneNumber(`+61${number}`);
			setConfirm(conformation);
			console.log(conformation);
			setIsLoading(false);
			console.log(confirm);
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
		} catch (err) {
			console.error(err);
			throw new Error('Invalid code');
		}
	};

	return [code, isLoading, setCode, signInwithNumber, confirmCode];
}
