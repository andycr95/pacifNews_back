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
        console.log(token.token);
        
        await app.firestore().collection('tokens').add({
            value: token.token
        }).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
    }
}

