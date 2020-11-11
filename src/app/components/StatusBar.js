import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
// StatusBar component for app
export default function StatusBar({ navigation, title, subtitle, backScreen }) {
	return (
		<Appbar.Header>
			{navigation ? (
				<Appbar.BackAction onPress={() => navigation.navigate(backScreen)} />
			) : (
				''
			)}
			<Appbar.Content
				title={title}
				subtitle={subtitle}
				titleStyle={style.title}
			/>
		</Appbar.Header>
	);
}

const style = StyleSheet.create({
	title: {
		fontSize: 20,
	},
});
