import React from 'react';
import { Image } from 'react-native';

const backgroundImgPath = '../../assets/background.png';
// Backgroung image component to load it in the Stak as a background Image
export default function BackgroundImg() {
	return <Image source={require(backgroundImgPath)}></Image>;
}
