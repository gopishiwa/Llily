import { useState, useEffect } from 'react';
import AsyncStorage, {
	useAsyncStorage,
} from '@react-native-async-storage/async-storage';

export default function useUser() {
	const [number, setNumber] = useState('');
	const [isUser, setIsUser] = useState(false);
	const [isGetting, setIsGetting] = useState(false);
	const { getItem, setItem } = useAsyncStorage('key');

	const hasLetter = () => {
		if (number === '') {
			return false;
		}
		return !number.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)
			? true
			: false;
	};

	const setUser = async user => {
		try {
			const stringUser = JSON.stringify(user);
			await setItem(stringUser);
			console.log(user);
			setIsUser(user);
		} catch (err) {
			throw new Error('Error setting user');
		}
	};

	const getUser = async () => {
		setIsGetting(true);
		try {
			const item = await getItem();
			if (item) {
				const user = JSON.parse(item);
				console.log('user.phone', user.phoneNumber);
				setNumber(user.phoneNumber);
				setIsUser(user);
				console.log(user);
			}
			setIsGetting(false);
		} catch (err) {
			console.error(err);
			throw new Error('Error accessing storage');
		}
	};

	const removeUser = async () => {
		try {
			//isUser.signOut();
			await AsyncStorage.removeItem('key');
			setNumber('');
			setIsUser(false);
		} catch (err) {
			console.error(err);
			throw new Error('Error during Login out');
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return [number, setNumber, isUser, hasLetter, isGetting, setUser, removeUser];
}
