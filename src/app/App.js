import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import LoginStack from './stack/LoginStack';

import firebase from '../common/config/firebase.config';

import useUser from '../common/hooks/useUser';
import useSignIn from '../common/hooks/useSignIn';

export default function App() {
	const [number, setNumber, hasLetter] = useUser('');
	const [code, isLoading, setCode, signInwithNumber, confirmCode] = useSignIn(
		''
	);
	return (
		<>
			<NavigationContainer>
				<LoginStack
					user={{ number, setNumber, hasLetter }}
					signIn={{ code, isLoading, setCode, signInwithNumber, confirmCode }}
				/>
			</NavigationContainer>
		</>
	);
}
