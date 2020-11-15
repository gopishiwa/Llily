import { useState, useEffect } from 'react';
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
		} catch (err) {
			console.error(err);
			throw new Error('Signin Failed');
		}
	};

	const confirmCode = async () => {
		setIsLoading(true);
		try {
			await confirm.confirm(code);
			setIsLoading(false);
			const isError = false;
			return [isError, confirm];
		} catch (err) {
			setIsLoading(false);
			console.error(err);
			return 'Invalid code!';
		}
	};

	useEffect(() => {}, []);
	return [code, isLoading, setCode, signInwithNumber, confirmCode];
}
