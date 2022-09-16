import admin from 'firebase-admin';
import { Message } from '../types';
const certFirebase = require('../firebase.json');
const app = admin.initializeApp({
    credential: admin.credential.cert(certFirebase)
});

export default class FirebaseController {


    public static async emitNotification (argument: Message): Promise<any | unknown> {
        await app.messaging().send({
            notification: {
                title: argument.notification.title,
                body: argument.notification.body,
                imageUrl: argument.notification.imageUrl
            },
            topic: argument.topic
        }, false).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
    }

    public static async registerToken (token: any): Promise<any | unknown> {
        await app.firestore().collection('tokens').get().then(async (snapshot) => {
            if (snapshot.size === 0) await app.firestore().collection('tokens').add(token);
            snapshot.forEach(async (doc) => {
                if (doc.data().token === token.token) {
                    return console.log('Token ya registrado');
                }
                await app.firestore().collection('tokens').add(token);
                
            });
        }).catch((error) => {
            return error;
        });
    }
}

