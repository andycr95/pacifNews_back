import express from 'express'
import firebaseController from '../controllers/firebaseController'
import micelaneusController from '../controllers/micelaneusController';

const router = express.Router()

// Emitir notificacion
router.post('/event', async (req, res) => {
    try {
        const { id } = req.body
        const event = await micelaneusController.getEventById(id);
        const message = {
            notification: {
                title: 'Nuevo evento',
                body: event?.titulo,
                imageUrl: `https://www.unipacifico.edu.co/storage/${event?.imagen_principal}`,
                fileUrl: null,
                data: event?.id.toString()
            },
            topic: 'articles'
        }
        const respToken = await firebaseController.emitNotification(message);
        res.status(200).json(respToken)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

export default router