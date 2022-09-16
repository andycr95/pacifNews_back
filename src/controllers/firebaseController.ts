import admin from 'firebase-admin';
import { Message } from '../types';
const certFirebase = require('../firebase.json');
const app = admin.initializeApp({
    credential: admin.credential.cert(certFirebase)
});

export default class FirebaseController {


    public static async emitNotification (argument: Message): Promise<any | unknown> {
        const tokensWithoutAplied = await app.firestore().collection('tokens').get();
        const tokens: any[] = [];
        if (tokensWithoutAplied.empty) {
            console.log('vacia');
            return 'No hay tokens registrados';
        }
        tokensWithoutAplied.forEach(async (doc) => {
            tokens.push(doc.data().token);
        });
        console.log(tokens);
        await app.messaging().sendMulticast({
            tokens,
            notification: {
                title: argument.notification.title,
                body: argument.notification.body,
                imageUrl: argument.notification.imageUrl,
            },
            data: {
                articleId: argument.notification.data
            },
        }, true).then((resp) => {
            console.log("Notificacion enviada: "+ resp.successCount);
            return "Notificacion enviada";
        }).catch((error) => {
            console.log("Notificacion errada: ", error);
            return error;
        });
    }

    public static async registerToken (token: any): Promise<any | unknown> {
        await app.firestore().collection('tokens').where('token', '==', token.token).get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                app.firestore().collection('tokens').add(token);
                console.log("Token registrado");
                return "Token registrado";
            } else {
                console.log("Token ya registrado");
                return "Token ya registrado";
            }
        }).catch((error) => {
            console.log(error);
            return error;
        });
    }
}

