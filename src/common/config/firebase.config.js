import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

import {
	apiKey,
	authDomain,
	databaseURL,
	projectId,
	storageBucket,
	messagingSenderId,
	appId,
	measurementId,
} from './enviroment.config';

const firebaseConfig = {
	apiKey: apiKey,
	authDomain: authDomain,
	databaseURL: databaseURL,
	projectId: projectId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	appId: appId,
	measurementId: measurementId,
};

if (firebase.apps.length === 0 ) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase;