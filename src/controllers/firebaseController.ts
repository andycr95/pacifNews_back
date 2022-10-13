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
        await app.messaging().sendMulticast({
            tokens,
            notification: {
                title: argument.notification.title,
                body: argument.notification.body,
                imageUrl: argument.notification.imageUrl!,
            },
            data: {
                articleId: argument.notification.data
            },
        }, false).then((resp) => {
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

    //Obtener lista de usuarios desde firestore
    public static async getUsers (): Promise<any | unknown> {
        const users = await app.firestore().collection('users').get();
        const usersList: any[] = [];
        if (users.empty) {
            console.log('vacia');
            return 'No hay usuarios registrados';
        }
        users.forEach(async (doc) => {
            usersList.push(doc.data());
        });
        return usersList;
    }

    // registrar usuario en firestore con token
    public static async registerUser (user: any): Promise<any | unknown> {
        await app.firestore().collection('users').where('token', '==', user.token).get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                app.firestore().collection('users').add(user);
                console.log("Usuario registrado");
                return "Usuario registrado";
            } else {
                console.log("Usuario ya registrado");
                return "Usuario ya registrado";
            }
        }).catch((error) => {
            console.log(error);
            return error;
        });
    }
}

