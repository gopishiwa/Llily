import React from 'react';
import { View } from 'react-native';

import StatusBar from '../components/StatusBar';

export default function SettingsScreen({ navigation }) {
	return (
		<>
			<StatusBar title={'Settings'} navigation={navigation} />
			<View></View>
		</>
	);
}
