import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

import LoginStack from './stack/LoginStack';
import HomeStack from './stack/HomeStack';
import RenderStack from './stack/RenderStack';

import firebase from '../common/config/firebase.config';

import useUser from '../common/hooks/useUser';
import useSignIn from '../common/hooks/useSignIn';
import usePdf from '../common/hooks/usePdf';
import useSignature from '../common/hooks/useSignature';

export default function App() {
	const [
		number,
		setNumber,
		isUser,
		hasLetter,
		isGetting,
		setUser,
		removeUser,
	] = useUser('');
	const [code, isLoading, setCode, signInwithNumber, confirmCode] = useSignIn(
		''
	);

	return (
		<>
			<NavigationContainer>
				{!isGetting ? (
					<RenderStack
						user={{
							number,
							setNumber,
							isUser,
							hasLetter,
							isGetting,
							setUser,
							removeUser,
						}}
						signIn={{ code, isLoading, setCode, signInwithNumber, confirmCode }}
					/>
				) : (
					<ActivityIndicator
						animating={true}
						color={'#644999'}
						style={{ flex: 1, justifyContent: 'center' }}
					/>
				)}
			</NavigationContainer>
		</>
	);
}
