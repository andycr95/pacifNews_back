const admin = require('firebase-admin')

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(__dirname+'/../../firebase.json'),
  projectId: "pacificnews-9b1d6",
  storageBucket: "pacificnews-9b1d6.appspot.com",
});

// Cloud storage
const bucket = admin.storage().bucket()

export default bucket;