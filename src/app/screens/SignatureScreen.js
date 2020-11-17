import React from 'react';
import { View, StyleSheet } from 'react-native';
import Signature from 'react-native-signature-canvas';

import StatusBar from '../components/StatusBar';

export default function SignatureScreen({ navigation, user }) {
	return (
		<>
			<StatusBar title={'Draw Your Signature'} navigation={navigation} />
			<View style={style.inner}>
				<Signature
					onOK={sig => {
						navigation.navigate('PDF Screen', {
							signature: sig,
						});
					}}
					onEmpty={() => console.log('___onEmpty')}
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
