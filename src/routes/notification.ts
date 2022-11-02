import express from 'express'
import firebaseController from '../controllers/firebaseController'
import micelaneusController from '../controllers/micelaneusController';
import newsController from '../controllers/newsController';

const router = express.Router()

// Emitir notificacion
router.post('/', async (req, res) => {
    try {
        const { id, type } = req.body
        let argument = { imagen_principal: '', titulo: '', id: '', cuerpo: '', tipo: '' }
        console.log(type);
        if (type == 'news') {
            const news = await newsController.getNewById(id);
            argument.imagen_principal = news?.imagen_principal || '';
            argument.titulo = 'Nueva noticia';
            argument.cuerpo = news?.titulo || '';
            argument.id = news?.id.toString() || '';
            argument.tipo = 'news';
        } else if (type == 'con') {
            const event = await micelaneusController.getConvocatoriaById(id);
            argument.imagen_principal = '';
            argument.titulo = 'Nueva convocatoria';
            argument.cuerpo = event?.titulo || '';
            argument.id = event?.id.toString() || '';
            argument.tipo = 'con';
        } else if (type == 'video') {
            const video = await micelaneusController.getVideoIById(id);
            argument.imagen_principal = video?.imagen || '';
            argument.titulo = 'Nuevo video institucional';
            argument.cuerpo = video?.titulo || '';
            argument.id = video?.id.toString() || '';
            argument.tipo = 'video';
        } else {
            const event = await micelaneusController.getEventById(id);
            argument.imagen_principal = event?.imagen_principal || '';
            argument.titulo = 'Nuevo evento';
            argument.cuerpo = event?.titulo || '';
            argument.id = event?.id.toString() || '';
            argument.tipo = 'event';
        }
        const message = {
            notification: {
                title: argument.titulo,
                body: argument?.cuerpo,
                imageUrl: `https://www.unipacifico.edu.co/storage/${argument?.imagen_principal}`,
                fileUrl: null,
                data: {id: argument?.id.toString(), type: argument?.tipo},
            },
            topic: argument?.tipo
        }
        const respToken = await firebaseController.emitNotification(message);
        res.status(200).json(respToken)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});


// Obtener notificaciones de un usuario
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const respToken = await firebaseController.getNotificationsByUser(id);
        res.status(200).json(respToken)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});


export default router