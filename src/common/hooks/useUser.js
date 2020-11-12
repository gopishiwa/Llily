import { useState, useEffect } from 'react';

export default function useUser() {
	const [userName, setUserName] = useState('');
	const [number, setNumber] = useState('');
	const hasLetter = () => {
		return !number.match(/\D/) ? false : true;
	};

	const hasSpecialChar = () => {
		return false;
	};
	return [userName, setUserName, number, setNumber, hasLetter, hasSpecialChar];
}
