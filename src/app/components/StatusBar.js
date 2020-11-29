import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
// StatusBar component for app
export default function StatusBar({ navigation, title, resetHook, action }) {
	return (
		<Appbar.Header style={style.header}>
			{Platform.OS === 'android' && !navigation && (
				<Button
					mode="text"
					onPress={() => console.log('pressed')}
					disabled={true}></Button>
			)}
			{navigation && (
				<Appbar.BackAction
					onPress={() => {
						if (!resetHook) {
							navigation.goBack();
						} else {
							resetHook('');
							navigation.goBack();
						}
					}}
					color={'#644999'}
				/>
			)}
			<Appbar.Content
				title={<Text style={style.title}>{title}</Text>}
				style={{ alignItems: 'center' }}
				subtitleStyle={{ textAlign: 'center' }}
			/>
			{Platform.OS === 'android' && !action && (
				<Button
					mode="text"
					onPress={() => console.log('pressed')}
					disabled={true}></Button>
			)}
			{action}
		</Appbar.Header>
	);
}

const style = StyleSheet.create({
	title: {
		fontSize: 20,
		color: '#644999',
	},
	header: {
		backgroundColor: '#ffffff',
	},
});
