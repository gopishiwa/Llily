import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Pdf from 'react-native-pdf';
import { decode as atob, encode as btoa } from 'base-64';

import StatusBar from '../components/StatusBar';
import WideBtn from '../components/WideBtn';

import usePdf from '../../common/hooks/usePdf';

const RNFS = require('react-native-fs');

export default function PDGScreen({ route, navigation, user }) {
	const [
		filePath,
		pageWidth,
		setPageWidth,
		pageHeight,
		setPageHeight,
		isNewPdfSaved,
		handleSingleTap,
		isEditMode,
		setIsEditMode,
		signature,
		setSignature,
	] = usePdf();

	function _base64ToArrayBuffer(base64) {
		var binary_string = atob(base64);
		var len = binary_string.length;
		var bytes = new Uint8Array(len);
		for (var i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes.buffer;
	}

	useEffect(() => {
		if (route.params?.signPath) {
			setIsEditMode(true);
			RNFS.readFile(route.params.signPath, 'base64').then(res => {
				setSignature(_base64ToArrayBuffer(res));
			});
		}
	}, [route.params?.signPath]);

	return (
		<>
			<StatusBar title={'Sign PDF'} navigation={navigation} />
			<View style={style.inner}>
				{!isNewPdfSaved ? (
					<>
						<ActivityIndicator animating={!isNewPdfSaved} />
						<Text>Downloading you PDF File....</Text>
					</>
				) : (
					<>
						{!isEditMode ? (
							<></>
						) : (
							<>
								<View style={style.editText}>
									<Text style={{ fontSize: 20 }}>*** Edit Mode ***</Text>
									<Text>Touch where you want to place the signature</Text>
								</View>
							</>
						)}
						<Pdf
							source={{ uri: filePath }}
							onLoadComplete={(numberOfPages, filePath, { width, height }) => {
								setPageWidth(width);
								setPageHeight(height);
								console.log('Page Width', pageWidth);
								console.log('Page Height', pageHeight);
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
								if (!isEditMode) {
									console.log(`tap: ${page}`);
									console.log(`x: ${x}`);
									console.log(`y: ${y}`);
								} else {
									handleSingleTap(page, x, y, signature);
									console.log(`tap: ${page}`);
									console.log(`x: ${x}`);
									console.log(`y: ${y}`);
								}
							}}
						/>
						{!isEditMode ? (
							<WideBtn
								name={'Sign PDF'}
								icon={'pencil'}
								btnStyle={style.btnSign}
								onPress={() => navigation.navigate('Signature')}
							/>
						) : (
							<></>
						)}
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
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '20%',
	},
	editText: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF88C',
		width: '100%',
	},
});
