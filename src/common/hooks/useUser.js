import { useState, useEffect } from 'react';

export default function useUser() {
	const [number, setNumber] = useState('');
	const hasLetter = () => {
		if (number === '') {
			return false;
		}
		return !number.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)
			? true
			: false;
	};

	return [number, setNumber, hasLetter];
}
