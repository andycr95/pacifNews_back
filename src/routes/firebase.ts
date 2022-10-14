import express from 'express'
import firebaseController from '../controllers/firebaseController'

const router = express.Router()

// Registrar token
router.post('/', async (req, res) => {
    try {
        const token = req.body;
        const respToken = await firebaseController.registerToken(token);
        res.status(200).json(respToken)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

//registrar usuario con token
router.post('/user', async (req, res) => {
    try {
        const token = req.body.token;
        const user = JSON.parse(req.body.user);
        const respToken = await firebaseController.registerUser({user, token});
        res.status(200).json(respToken)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

// Obtener lista de usuarios
router.get('/users', async (_req, res) => {
    try {
        const users = await firebaseController.getUsers();
        res.status(200).json(users)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

// Enviar notificacion a un grupo de usuarios
router.post('/notification/bulk', async (req, res) => {
    try {
        const { users, title, body } = req.body;
        if (users.length == 0) {
            const respToken = await firebaseController.emitNotificationBulk({title, body});
            res.status(200).json(respToken)
        } else {
            const respToken = await firebaseController.emitNotificationToUsers({users, title, body});
            res.status(200).json(respToken)
        }
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

// Enviar notificacion a un usuario
router.post('/notification', async (req, res) => {
    try {
        const argument = req.body;
        const respToken = await firebaseController.emitNotificationToUser(argument);
        res.status(200).json(respToken)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

export default router