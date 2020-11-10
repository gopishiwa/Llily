import 'react-native-gesture-handler';

import * as React from 'react';
import { AppRegistry } from 'react-native';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import App from './src/app/App';
import { name as appName } from './app.json';

const theme = {
	...DefaultTheme,
	roundness: 20,
	colors: {
		...DefaultTheme.colors,
		primary: '#644999',
		accent: '#f1c40f',
		background: '#000000',
	},
};
// app entry point 
export default function Main() {
	return (
		<PaperProvider
			theme={theme}
			settings={{
				icon: props => <Ionicons {...props} />,
			}}>
			<App />
		</PaperProvider>
	);
}

AppRegistry.registerComponent(appName, () => Main);
