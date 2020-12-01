import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import storage from '@react-native-firebase/storage';
import { decode as atob, encode as btoa } from 'base-64';
import { PDFDocument } from 'pdf-lib';

const RNFS = require('react-native-fs');
// Cnahges the arraybuffer to base64 file encode to save it later in the system memory
function _arrayBufferToBase64(buffer) {
	let binary = '';
	let bytes = new Uint8Array(buffer);
	let len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}
// Changes base64 files to ArrayBuffer so that PDF-lib can interact with the files
function _base64ToArrayBuffer(base64) {
	let binary_string = atob(base64);
	let len = binary_string.length;
	let bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
}

export default function usePdf(number) {
	const [isFile, setIsFile] = useState(true);
	const [pageWidth, setPageWidth] = useState(0);
	const [pageHeight, setPageHeight] = useState(0);
	const [isNewPdfSaved, setIsNewPdfSaved] = useState(false);
	const [pdfArrayBuffer, setPdfArrayBuffer] = useState(null);
	const [pdfBase64, setPdfBase64] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [signature, setSignature] = useState(null);
	const [filePath, setFilePath] = useState(
		`${RNFS.DocumentDirectoryPath}/${number}.pdf`
	);
	// Handles the single tap on the PDF page during edit mode to embed it with the signature ONG
	const handleSingleTap = async (page, x, y, signatureArrayBuffer, number) => {
		const date = new Date();
		// Creating refrence in the firebase storage to save it in the cloud database
		const reference = storage().ref(
			`/signPDF/dummy-${number}${date.toString()}.pdf`
		);
		setIsNewPdfSaved(false);
		setFilePath(null);
		// Loads the Downloaded PDF files ArrayBuffer after it is saved in the system memory
		const pdfDoc = await PDFDocument.load(pdfArrayBuffer);

		const pages = pdfDoc.getPages();
		const firstPage = pages[page - 1];

		// Change the values of the axies to manuplate where the PNG file will be embedded
		const signatureImage = await pdfDoc.embedPng(signatureArrayBuffer);
		const pngDims = signatureImage.scale(0.3);
		if (Platform.OS === 'ios') {
			firstPage.drawImage(signatureImage, {
				x: (pageWidth * (x - 12)) / Dimensions.get('window').width,
				y: pageHeight - (pageHeight * (y + 12)) / 540,
				width: pngDims.width,
				height: pngDims.height,
			});
		} else {
			firstPage.drawImage(signatureImage, {
				x: (firstPage.getWidth() * x) / pageWidth,
				y:
					firstPage.getHeight() - (firstPage.getHeight() * y) / pageHeight - 25,
				width: pngDims.width,
				height: pngDims.height,
			});
		}

		const pdfBytes = await pdfDoc.save();
		const pdfBase = _arrayBufferToBase64(pdfBytes);
		const path = `${RNFS.DocumentDirectoryPath}/${number}.pdf`;
		console.log('path', path);

		RNFS.writeFile(path, pdfBase, 'base64')
			.then(success => {
				setFilePath(path);
				setIsNewPdfSaved(true);
				setPdfBase64(pdfBase);
				setIsEditMode(false);
				setSignature(null);
				// Uploads the PDF file to the storage with its unique name after the PNG is embeded
				reference
					.putFile(path)
					.then(res => {
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
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
				.ref(`${number}.pdf`)
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
				})
				.catch(err => {
					setIsFile(false);
					console.log(err);
				});
		} catch (err) {
			setFilePath(`${RNFS.DocumentDirectoryPath}/${number}.pdf`);
			console.log(err);
			throw new Error('Error getting URL');
		}
	}

	const readFile = () => {
		RNFS.readFile(filePath, 'base64').then(contents => {
			setPdfBase64(contents);
			setPdfArrayBuffer(_base64ToArrayBuffer(contents));
			setIsNewPdfSaved(true);
		});
	};

	const loadingFile = async () => {
		if (!isNewPdfSaved) {
			try {
				const res = await RNFS.exists(filePath);
				if (!res) {
					downloadFile();
				} else {
					readFile();
				}
			} catch (err) {
				throw new Error('File access denied');
			}
		}
	};

	useEffect(() => {
		console.log(`number: ${number}`);
		loadingFile();
	}, []);

	return [
		isFile,
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
