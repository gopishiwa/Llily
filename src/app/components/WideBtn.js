import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function WideBtn({ icon, onPress, name, btnStyle, disable }) {
	return (
		<Button
			uppercase={false}
			icon={icon}
			mode="contained"
			onPress={onPress}
			contentStyle={{ width: 300, height: 60 }}
			labelStyle={style.btnText}
			style={btnStyle}
			disabled={disable}>
			{name}
		</Button>
	);
}

const style = StyleSheet.create({
	btnText: {
		fontSize: 20,
		textAlign: 'center',
		textTransform: 'capitalize',
	},
});
