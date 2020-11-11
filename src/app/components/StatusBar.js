import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
// StatusBar component for app
export default function StatusBar({ navigation, title, subtitle, backScreen }) {
	return (
		<Appbar.Header style={style.header}>
			{navigation ? (
				<Appbar.BackAction
					onPress={() => navigation.navigate(backScreen)}
					color={'#644999'}
				/>
			) : (
				{}
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
	header: {
		backgroundColor: 'rgba(0, 0, 0, 0)',
	},
});
