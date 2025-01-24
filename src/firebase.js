import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCqL7lnooyjmNGAOB5nc4yZcb6FKu8e-2A",
  authDomain: "trafyai-loginsignup.firebaseapp.com",
  projectId: "trafyai-loginsignup",
  storageBucket: "trafyai-loginsignup.appspot.com",
  messagingSenderId: "344792634329",
  appId: "1:344792634329:web:d343ac2461dd2a731dffc8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

// Set persistence to localStorage
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to browserLocalPersistence");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, database, storage };
