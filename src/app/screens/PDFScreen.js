import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import Pdf from 'react-native-pdf';
import storage from '@react-native-firebase/storage';

import StatusBar from '../components/StatusBar';
import WideBtn from '../components/WideBtn';

export default function PDGScreen({ navigation, user }) {
	const [url, setUrl] = useState('');

	async function getDownloadUrl() {
		setUrl(await storage().ref('dummy.pdf').getDownloadURL());
	}

	useEffect(() => {
		getDownloadUrl();
		console.log(url);
	}, []);

	const source = {
		uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
		cache: true,
	};
	return (
		<>
			<StatusBar title={'Sign PDF'} navigation={navigation} />
			<View style={style.inner}>
				{!url ? (
					<></>
				) : (
					<>
						<Pdf
							source={{ uri: url, cache: true }}
							onLoadComplete={(numberOfPages, filePath, { width, height }) => {
								console.log(`number of pages: ${numberOfPages}`);
								console.log(`width: ${width}`);
								console.log(`height: ${height}`);
							}}
							onPageChanged={(page, numberOfPages) => {
								console.log(`current page: ${page}`);
								console.log(url);
							}}
							onError={error => {
								console.log(error);
							}}
							onPressLink={uri => {
								console.log(`Link presse: ${uri}`);
							}}
							style={style.pdf}
							minScale={1.0}
							maxScale={1.0}
							scale={1.0}
							spacing={0}
							fitPolicy={0}
							enablePaging={true}
						/>
						<WideBtn
							name={'Sign PDF'}
							icon={'pencil'}
							btnStyle={style.btnSign}
							onPress={() => navigation.navigate('Home')}
						/>
					</>
				)}
			</View>
		</>
	);
}

const style = StyleSheet.create({
	inner: {
		flex: 1,
	},
	pdf: {
		flex: 11,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	btnSign: {
		flex: 1,
		width: 300,
		height: 60,
		marginBottom: '20%',
		left: '13%',
	},
});
