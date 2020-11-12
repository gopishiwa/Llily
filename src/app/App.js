import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import LoginStack from './stack/LoginStack';

import firebase from '../common/config/firebase.config';

import useUser from '../common/hooks/useUser';

export default function App() {
	const [
		userName,
		setUserName,
		number,
		setNumber,
		hasLetter,
		hasSpecialChar,
	] = useUser('');
	return (
		<>
			<NavigationContainer>
				<LoginStack
					user={{
						userName,
						setUserName,
						number,
						setNumber,
						hasLetter,
						hasSpecialChar,
					}}
				/>
			</NavigationContainer>
		</>
	);
}
