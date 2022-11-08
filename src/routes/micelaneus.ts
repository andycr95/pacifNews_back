import express from 'express'
import micelaneusController from '../controllers/micelaneusController'
//import toNewTvGrillEntry from '../utils/micelaneusParsers'

const router = express.Router()


// Listar eventos destacados, maximo 20
router.get('/events', async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const events = await micelaneusController.getEvents(page, limit)
        res.status(200).json(events)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

// listar eventos destacados
router.get('/events/destacados', async (_req, res) => {
    try {
        const events = await micelaneusController.getEventsDestacados()
        res.status(200).json(events)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

// obtener evento destacado por id
router.get('/events/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const event = await micelaneusController.getEventById(id)
        res.status(200).json(event)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
})

// Listar videos institucionales, maximo 20
router.get('/videosI', async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const videosI = await micelaneusController.getVideos(page, limit)
        res.status(200).json(videosI)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

// obtener video institucional por id
router.get('/videosI/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const videoI = await micelaneusController.getVideoIById(id)
        res.status(200).json(videoI)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
})

// Listar documentos de convocatorias, tipo = tipodoc
router.get('/convocatorias', async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const convocatorias = await micelaneusController.getConvocatorias(page, limit)
        res.status(200).json(convocatorias)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

// obtener documento de convocatoria por id
router.get('/convocatorias/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const convocatoria = await micelaneusController.getConvocatoriaById(id)
        res.status(200).json(convocatoria)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
})

// Listar todos los banners
router.get('/banners', async (_req, res) => {
    try {
        const banners = await micelaneusController.getBanners()
        res.status(200).json(banners)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

// Listar banners destacados
router.get('/banners/destacados', async (_req, res) => {
    try {
        const banners = await micelaneusController.getBannersDestacados()
        res.status(200).json(banners)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

// Listar los canales de ivs
router.get('/channels', async (_req, res) => {
    const canales = await micelaneusController.getChannels()
    res.status(200).json(canales)
})

// obtener canal por id
router.get('/channels/select', async (req, res) => {
    const arn = req.query.arn?.toString() || '';
    const canal = await micelaneusController.getChannelById(arn);
    res.status(200).json(canal);
})

// Listar los streams de un canal de ivs
router.get('/channels/streams', async (req, res) => {
    try {
        const arn = req.query.arn?.toString() || '';
        const streams = await micelaneusController.getStreamsByChannel(arn);
        res.status(200).json({streams, isAction: true})
    } catch (error: any) {
        res.status(400).json({ error: error.message, isActive: false })
    }
})

// crear un canal de ivs
router.post('/channels', async (req, res) => {
    try {
        const newChannel = {
            authorized: false,
            latencyMode: 'LOW',
            name: req.body.name,
            type: 'BASIC',
        }
        const firebase = {
            name: req.body.name,
            description: req.body.description,
            image: req.body.imageURL,
        }
        const addedChannel = await micelaneusController.addChannel(newChannel, firebase)
        res.status(200).json(addedChannel)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

/*
// Crear un live stream
router.post('/live', async (_req, res) => {
    try {
        const live = await micelaneusController.createLive()
        res.status(200).json(live)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

// Listar todos los live streams
router.get('/live', async (_req, res) => {
    try {
        const lives = await micelaneusController.getLives()
        res.status(200).json(lives)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

// Listar live streams activos
router.get('/live/activos', async (_req, res) => {
    try {
        const lives = await micelaneusController.getLiveActive()
        res.status(200).json(lives)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
})

// eliminar live stream por id
router.delete('/live/:id', async (req, res) => {
    try {
        const live = await micelaneusController.deleteLive(req.params.id)
        res.status(200).json(live)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
})*/


export default router