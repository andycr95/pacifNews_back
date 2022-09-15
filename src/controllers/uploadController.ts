import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCq10SbmUUg6650qfzbpVJ3gIFCF6CsB60",
  projectId: "pacificnews-9b1d6",
  storageBucket: "pacificnews-9b1d6.appspot.com",
  appId: "1:956639410355:web:de738ffcccde32825058c6",
  measurementId: "G-T09NL1WM1Z"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const metadata = {
  contentType: 'image/jpeg'
};

export default class UploadController {
    public static async uploadFile (file: any): Promise<any | unknown> {
        const storageRef = ref(storage, `${__dirname}/../uploads/${file.fieldname}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on('state_changed',
        () => {},
        () => {},
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                return downloadURL;
            });
        }
        );
    }
}

