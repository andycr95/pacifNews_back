import express from 'express'
import firebaseController from '../controllers/firebaseController'

const router = express.Router()

// Registrar token
router.post('/', async (req, res) => {
    try {
        const token = req.body.token;
        const respToken = await firebaseController.registerToken(token);
        res.status(200).json(respToken)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

export default router