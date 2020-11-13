import { useState, useEffet } from 'react';
import auth from '@react-native-firebase/auth';

export default function useSignIn({}) {
	const [confirm, setConfirm] = useState(null);
	const [code, setCode] = useState('');

	const signInwithNumber = async number => {
		try {
			if (number.startsWith('0')) {
				number.replace('0', '');
			}
			const conformation = await auth().signInWithPhoneNumber(`+61${number}`);
			setConfirm(conformation);
			console.log(confirm);
		} catch (err) {
			console.log(err);
			throw new Error('Signin Failed');
		}
	};

	const confirmCode = async () => {
		try {
			await confirm.confirm(code);
			console.log(confirm);
		} catch (err) {
			throw new Error('Invalid code');
		}
	};

	return [code, setCode, signInwithNumber, confirmCode];
}
