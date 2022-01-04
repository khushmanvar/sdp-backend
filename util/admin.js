const admin = require('firebase-admin');

const serviceAccount = require('../easybus-43754-firebase-adminsdk-ryy5l-c062abdfb5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };