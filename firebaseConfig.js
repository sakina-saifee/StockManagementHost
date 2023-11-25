
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import { getDatabase, ref, set, child, get, update, remove,push } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getStorage, uploadBytesResumable, getDownloadURL, ref as sref } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
  const firebaseConfig = {
    apiKey: "AIzaSyDu9pMyr_IhzRpvWHdexhEJ-J-SSK_PrwQ",
    authDomain: "stockmanagement-10177.firebaseapp.com",
    projectId: "stockmanagement-10177",
    storageBucket: "stockmanagement-10177.appspot.com",
    messagingSenderId: "683283512413",
    appId: "1:683283512413:web:c89b83034fb26756b4a1b4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export {app, getAuth, onAuthStateChanged, createUserWithEmailAndPassword,signInWithEmailAndPassword, push, initializeApp, getAnalytics, getDatabase, ref, set, child, get, update, remove, getStorage, uploadBytesResumable, getDownloadURL, sref }
