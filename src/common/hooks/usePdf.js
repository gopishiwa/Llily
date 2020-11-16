import { useState, useEffect } from 'react';
import storage from '@react-native-firebase/storage';

const RNFS = require('react-native-fs');

export default function usePdf() {
	const [fileDownloaded, setFileDownloaded] = useState(false);

	const filePath = `${RNFS.DocumentDirectoryPath}/dummy.pdf`;

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
					})
						.promise.then(res => console.log('File Downloaded', res))
						.then(() => setFileDownloaded(true));
				});
		} catch (err) {
			console.log(err);
			throw new Error('Error getting URL');
		}
	}

	useEffect(() => {
		downloadFile();
	}, []);

	return [fileDownloaded, filePath];
}
