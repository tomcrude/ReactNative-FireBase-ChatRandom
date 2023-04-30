import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import { API_KEY, DOMAIN, PROJECT_ID, STORAGE_BUCKET, SENDER, APP_ID, MEASUREMENT } from '@env';
// Firebase config.

const firebaseConfig = {
    apiKey: API_KEY,
  authDomain: DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: SENDER,
  appId: APP_ID,
  measurementId: MEASUREMENT
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);







