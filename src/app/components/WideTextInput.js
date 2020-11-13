import React from 'react';
import { TextInput, HelperText } from 'react-native-paper';

export default function WideTextInput({
	setText,
	hasError,
	style,
	label,
	placeholder,
	text,
	keyboardType,
	icon,
}) {
	return (
		<>
			<TextInput
				right={<TextInput.Icon name={icon} />}
				label={label}
				placeholder={placeholder}
				mode={'outlined'}
				onChangeText={text => setText(text)}
				style={style}
				keyboardType={keyboardType}
			/>
			<HelperText type={'error'} visible={hasError()}>
				{text}
			</HelperText>
		</>
	);
}
