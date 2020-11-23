import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import Signature from 'react-native-signature-canvas';

import StatusBar from '../components/StatusBar';

const RNFS = require('react-native-fs');

export default function SignatureScreen({ navigation, user }) {
	const handleSignature = signature => {
		const filePath = `${RNFS.CachesDirectoryPath}/sign.png`;
		RNFS.writeFile(
			filePath,
			signature.replace('data:image/png;base64,', ''),
			'base64'
		).then(() => {
			navigation.navigate('PDF Screen', {
				signPath: filePath,
			});
		});
	};

	const handleEmpty = () => {
		Alert.alert(
			'Empty Signature',
			'Please draw your signature on the canvas',
			[{ text: 'OK', onPress: () => console.log('OK Pressed') }],
			{ cancelable: true }
		);
	};

	return (
		<>
			<StatusBar title={'Draw Your Signature'} navigation={navigation} />
			<View style={style.inner}>
				<Signature
					onOK={handleSignature}
					onEmpty={handleEmpty}
					descriptionText="Sign"
					clearText="Clear"
					confirmText="Save"
				/>
			</View>
		</>
	);
}

const style = StyleSheet.create({
	inner: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
	},
});
