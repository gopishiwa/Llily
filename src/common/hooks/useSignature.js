import { useState, useEffect } from 'react';

import { decode as atob, encode as btoa } from 'base-64';

const base64ToArrayBuffer = base64 => {
	const binary_string = atob(base64);
	const len = binary_string.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
};

export default function useSignature() {
	const [isEditMode, setIsEditMode] = useState(false);
	const [signatureBase64, setSignatureBase64] = useState(null);
	const [signatureArrayBuffer, setSignatureArrayBuffer] = useState(null);

	const handleSignature = signature => {
		setSignatureBase64(signature.replace('data:image/png;base64,', ''));
		setSignatureArrayBuffer(base64ToArrayBuffer(signatureBase64));
		setIsEditMode(true);
		console.log('Signature Base64', signatureBase64);
		console.log(base64ToArrayBuffer(signatureBase64));
		console.log(isEditMode);
	};

	return [isEditMode, handleSignature, signatureArrayBuffer];
}
