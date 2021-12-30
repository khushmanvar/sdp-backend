const admin = require('firebase-admin');

const serviceAccount = require('../csi-website-cd583-firebase-adminsdk-ec468-5e07a525fd.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };