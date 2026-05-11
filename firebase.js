import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAs-n0foyw5FDSmmxm_9H-cZTDIRmTEQpk",
  authDomain: "blog-a982c.firebaseapp.com",
  databaseURL: "https://blog-a982c-default-rtdb.firebaseio.com",
  projectId: "blog-a982c",
  storageBucket: "blog-a982c.firebasestorage.app",
  messagingSenderId: "666720378473",
  appId: "1:666720378473:web:672d8f0de10b70f2418cf8"
};


const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export {
  ref,
  push,
  onValue,
  remove
};
