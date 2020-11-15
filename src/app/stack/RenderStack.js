import React from 'react';

import HomeStack from './HomeStack';
import LoginStack from './LoginStack';

export default function RenderStack({ user, signIn }) {
	const { isUser } = user;
	return (
		<>
			{!isUser ? (
				<LoginStack user={user} signIn={signIn} />
			) : (
				<HomeStack user={user} />
			)}
		</>
	);
}
