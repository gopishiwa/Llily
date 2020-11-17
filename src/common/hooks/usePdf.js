import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import storage from '@react-native-firebase/storage';
import { decode as atob, encode as btoa } from 'base-64';
import { PDFDocument } from 'pdf-lib';

const RNFS = require('react-native-fs');

const uint8ToBase64 = u8Arr => {
	console.log('u8Arr', u8Arr);
	const CHUNK_SIZE = 0x8000; //arbitrary number
	let index = 0;
	const length = u8Arr.length;
	let result = '';
	let slice;
	while (index < length) {
		slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
		result += String.fromCharCode.apply(null, slice);
		index += CHUNK_SIZE;
	}
	console.log('btoa', result);
	return btoa(result);
};

const base64ToArrayBuffer = base64 => {
	const binary_string = atob(base64);
	const len = binary_string.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binary_string.charCodeAt(i);
	}
	console.log('bytes.buffer', bytes.buffer);
	return bytes.buffer;
};

export default function usePdf() {
	const [pageWidth, setPageWidth] = useState(0);
	const [pageHeight, setPageHeight] = useState(0);
	const [isNewPdfSaved, setIsNewPdfSaved] = useState(false);
	const [pdfArrayBuffer, setPdfArrayBuffer] = useState(null);
	const [pdfBase64, setPdfBase64] = useState(null);
	const [filePath, setFilePath] = useState(
		`${RNFS.DocumentDirectoryPath}/dummy.pdf`
	);

	const handleSingleTap = async (page, x, y, signatureArrayBuffer) => {
		setIsNewPdfSaved(false);
		setFilePath(null);
		try {
			const pdfDoc = await PDFDocument.load(pdfArrayBuffer);

			const pages = pdfDoc.getPages();
			const firstPage = pages[page - 1];

			// The meat
			const signatureImage = await pdfDoc.embedPng(signatureArrayBuffer);
			if (Platform.OS == 'ios') {
				firstPage.drawImage(signatureImage, {
					x: (pageWidth * (x - 12)) / Dimensions.get('window').width,
					y: pageHeight - (pageHeight * (y + 12)) / 540,
					width: 50,
					height: 50,
				});
			} else {
				firstPage.drawImage(signatureImage, {
					x: (firstPage.getWidth() * x) / pageWidth,
					y:
						firstPage.getHeight() -
						(firstPage.getHeight() * y) / pageHeight -
						25,
					width: 50,
					height: 50,
				});
			}
			// Play with these values as every project has different requirements

			const pdfBytes = await pdfDoc.save();
			const pdfBase = uint8ToBase64(pdfBytes);
			const path = `${RNFS.DocumentDirectoryPath}/dummy_${Date.now()}.pdf`;
			console.log('path', path);
		} catch (err) {
			console.error(err);
		}

		RNFS.writeFile(path, pdfBase64, 'base64')
			.then(success => {
				setFilePath(path);
				setIsNewPdfSaved(true);
				setPdfBase64(pdfBase);
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
						setIsNewPdfSaved(true);
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
		RNFS.readFile(filePath, 'base64').then(contents => {
			setPdfBase64(contents);
			setPdfArrayBuffer(base64ToArrayBuffer(contents));
			console.log('PDF base-64', pdfBase64);
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
	];
}
