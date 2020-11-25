import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import storage from '@react-native-firebase/storage';
import { decode as atob, encode as btoa } from 'base-64';
import { PDFDocument } from 'pdf-lib';

const RNFS = require('react-native-fs');

function _arrayBufferToBase64(buffer) {
	var binary = '';
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

function _base64ToArrayBuffer(base64) {
	var binary_string = atob(base64);
	var len = binary_string.length;
	var bytes = new Uint8Array(len);
	for (var i = 0; i < len; i++) {
		bytes[i] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
}

export default function usePdf() {
	const [pageWidth, setPageWidth] = useState(0);
	const [pageHeight, setPageHeight] = useState(0);
	const [isNewPdfSaved, setIsNewPdfSaved] = useState(false);
	const [pdfArrayBuffer, setPdfArrayBuffer] = useState(null);
	const [pdfBase64, setPdfBase64] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [signature, setSignature] = useState(null);
	const [filePath, setFilePath] = useState(
		`${RNFS.DocumentDirectoryPath}/dummy.pdf`
	);

	const handleSingleTap = async (page, x, y, signatureArrayBuffer) => {
		setIsNewPdfSaved(false);
		setFilePath(null);
		const pdfDoc = await PDFDocument.load(pdfArrayBuffer);

		const pages = pdfDoc.getPages();
		const firstPage = pages[page - 1];

		// The meat
		const signatureImage = await pdfDoc.embedPng(signatureArrayBuffer);
		if (Platform.OS === 'ios') {
			firstPage.drawImage(signatureImage, {
				x: (pageWidth * (x - 12)) / Dimensions.get('window').width,
				y: pageHeight - (pageHeight * (y + 12)) / 540,
				width: 5,
				height: 5,
			});
		} else {
			firstPage.drawImage(signatureImage, {
				x: (firstPage.getWidth() * x) / pageWidth,
				y:
					firstPage.getHeight() - (firstPage.getHeight() * y) / pageHeight - 25,
				width: 5,
				height: 5,
			});
		}
		firstPage.drawImage(signatureImage);
		// Play with these values as every project has different requirements

		const pdfBytes = await pdfDoc.save();
		const pdfBase = _arrayBufferToBase64(pdfBytes);
		const path = `${RNFS.DocumentDirectoryPath}/dummy.pdf`;
		console.log('path', path);

		RNFS.writeFile(path, pdfBase, 'base64')
			.then(success => {
				setFilePath(path);
				setIsNewPdfSaved(true);
				setPdfBase64(pdfBase);
				setIsEditMode(false);
				setSignature(null);
			})
			.catch(err => {
				setIsNewPdfSaved(true);
				console.log(err);
			});
	};

	async function downloadFile() {
		console.log('File Download Start');
		try {
			storage()
				.ref('dummy.pdf')
				.getDownloadURL()
				.then(url => {
					console.log('URL', url);
					RNFS.downloadFile({
						fromUrl: url,
						toFile: filePath,
					}).promise.then(res => {
						console.log('File Downloaded', res);
						readFile();
					});
				});
		} catch (err) {
			setFilePath(`${RNFS.DocumentDirectoryPath}/dummy.pdf`);
			console.log(err);
			throw new Error('Error getting URL');
		}
	}

	const readFile = () => {
		RNFS.readFile(filePath, 'base64')
			.then(contents => {
				setPdfBase64(contents);
				setPdfArrayBuffer(_base64ToArrayBuffer(contents));
				setIsNewPdfSaved(true);
				return true;
			})
			.catch(err => {
				return false;
			});
	};

	useEffect(() => {
		if (!isNewPdfSaved) {
			downloadFile();
		}
	}, []);

	return [
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
	];
}
