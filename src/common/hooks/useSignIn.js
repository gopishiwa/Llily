import { useState, useEffet } from 'react';
import auth from '@react-native-firebase/auth';

export default function useSignIn({}) {
	const [confirm, setConfirm] = useState(null);
	const [code, setCode] = useState('');

	const signInwithNumber = async number => {
		try {
			const conformation = await auth().signInWithPhoneNumber(number);
			setConfirm(conformation);
		} catch (err) {
			throw new Error('Signin Failed');
		}
	};

	const confirmCode = async () => {
		try {
			await confirm.confirm(code);
		} catch (err) {
			throw new Error('Invalid code');
		}
	};

	return [confirm, setCode, signInwithNumber, confirmCode];
}
