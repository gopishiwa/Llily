import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

import RenderStack from './stack/RenderStack';

import useUser from '../common/hooks/useUser';
import useSignIn from '../common/hooks/useSignIn';

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
