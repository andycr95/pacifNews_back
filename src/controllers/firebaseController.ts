import admin from 'firebase-admin';
import { Message } from '../types';
const certFirebase = require('../firebase.json');
const app = admin.initializeApp({
    credential: admin.credential.cert(certFirebase)
});
app.firestore().settings({ ignoreUndefinedProperties: true })

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
                id: argument.notification.data.id,
                type: argument.notification.data.type,
            },
        }, false).then((resp) => {
            console.log("Notificacion enviada: "+ resp.successCount);
            return "Notificacion enviada";
        }).catch((error) => {
            console.log("Notificacion errada: ", error);
            return error;
        });
    }

    /// Emitir notificacion a un grupo de usuarios
    public static async emitNotificationToUsers (argument: any): Promise<any | unknown> {
        const users = await app.firestore().collection('users').where('user.idusuario', 'in', argument.users).get();
        if (users.empty) {
            console.log('vacia');
            return 'No hay usuarios registrados';
        }
        const tokens: any[] = [];
        users.forEach(async (doc) => {
            tokens.push(doc.data().token);
        });
        await app.messaging().sendMulticast({
            tokens,
            notification: {
                title: 'Tienes un nuevo mensaje',
                body: argument.body,
            },
        }, false).then((resp) => {
            console.log("Notificacion enviada: "+ resp.successCount);
            return "Notificacion enviada";
        }).catch((error) => {
            console.log("Notificacion errada: ", error);
            return error;
        });
    }

    /// Emitir notificacion a un grupo de usuarios
    public static async emitNotificationBulk (argument: any): Promise<any | unknown> {
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
                title: 'Tienes un nuevo mensaje',
                body: argument.body,
            },
        }, false).then((resp) => {
            console.log("Notificacion enviada bulk: "+ resp.successCount);
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

    // emitir notificacion a un usuario
    public static async emitNotificationToUser (argument: any): Promise<any | unknown> {
        const user = await app.firestore().collection('users').where('user.idusuario', '==', argument.idusuario).get();
        if (user.empty) {
            console.log('vacia');
            return 'No hay usuarios registrados';
        }
        await app.messaging().send({
            token: user.docs[0].data().token,
            notification: {
                title: 'Tienes un nuevo mensaje',
                body: argument.title
            }
        }).then((resp) => {
            app.firestore().collection('notifications').add(argument);
            console.log("Notificacion enviada: "+ resp);
            return "Notificacion enviada";
        }).catch((error) => {
            console.log("Notificacion errada: ", error);
            return error;
        });
    }

    // Listar canaler
    public static async getChannels (): Promise<any | unknown> {
        const channels = await app.firestore().collection('channels').get();
        const channelsList: any[] = [];
        channels.forEach(async (doc) => {
            channelsList.push(doc.data().id);
        });
        return channelsList;
    }

    // Listar canaler
    public static async getChannelsAll (): Promise<any | unknown> {
        const channels = await app.firestore().collection('channels').get();
        const channelsList: any[] = [];
        channels.forEach(async (doc) => {
            channelsList.push(doc.data());
        });
        return channelsList;
    }

    // obtener canal por id
    public static async getChannelById (id: any): Promise<any | unknown> {
        const channel = await app.firestore().collection('channels').where('id', '==', id).get();
        return channel.docs[0].data();
    }

    // registrar canal en firestore
    public static async registerChannel (channel: any): Promise<any | unknown> {
        await app.firestore().collection('channels').where('id', '==', channel.channel.arn).get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                app.firestore().collection('channels').add(channel);
                console.log("Canal registrado");
                return "Canal registrado";
            } else {
                console.log("Canal ya registrado");
                return "Canal ya registrado";
            }
        }).catch((error) => {
            console.log(error);
            return error;
        });
    }

}

