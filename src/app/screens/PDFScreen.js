import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Pdf from 'react-native-pdf';

import StatusBar from '../components/StatusBar';
import WideBtn from '../components/WideBtn';

import usePdf from '../../common/hooks/usePdf';

export default function PDGScreen({ navigation, user }) {
	const [fileDownloaded, filePath] = usePdf('');

	return (
		<>
			<StatusBar title={'Sign PDF'} navigation={navigation} />
			<View style={style.inner}>
				{!fileDownloaded ? (
					<>
						<ActivityIndicator animating={!fileDownloaded} />
						<Text>Downloading you PDF File....</Text>
					</>
				) : (
					<>
						<Pdf
							source={{ uri: filePath }}
							onLoadComplete={(numberOfPages, filePath, { width, height }) => {
								console.log(`number of pages: ${numberOfPages}`);
								console.log(`width: ${width}`);
								console.log(`height: ${height}`);
							}}
							onPageChanged={(page, numberOfPages) => {
								console.log(`current page: ${page}`);
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
							onPageSingleTap={(page, x, y) => {
								console.log(`tap: ${page}`);
								console.log(`x: ${x}`);
								console.log(`y: ${y}`);
							}}
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
		justifyContent: 'center',
		alignItems: 'center',
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
	},
});
