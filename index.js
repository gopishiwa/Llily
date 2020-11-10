import 'react-native-gesture-handler';

import * as React from 'react';
import { AppRegistry, ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import App from './src/app/App';
import { name as appName } from './app.json';

const backgroungImg = './src/assets/backgroung.png';

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

export default function Main() {
	return (
		<PaperProvider
			theme={theme}
			settings={{
				icon: props => <Ionicons {...props} />,
			}}>
			<NavigationContainer>
				<ImageBackground source={require(backgroungImg)} style={style.image}>
					<App />
				</ImageBackground>
			</NavigationContainer>
		</PaperProvider>
	);
}

const style = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
});

AppRegistry.registerComponent(appName, () => Main);
