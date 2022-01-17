const admin = require('firebase-admin');

const serviceAccount = require('../easybus-43754-firebase-adminsdk-ryy5l-c062abdfb5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://easybus-43754-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();
const dbRT = admin.database();

module.exports = { admin, db, dbRT };