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

export default router