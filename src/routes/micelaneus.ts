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

/*
// Listar todos las parrillas
router.get('/', async (_req, res) => {
  try {
    const tvgrills = await micelaneusController.getTvGrills()
    res.status(200).json(tvgrills)
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
})

// Registrar una parrilla
router.post('/', async (req, res) => {
    try {
        const tvgrillEntry = toNewTvGrillEntry(req.body);
        const tvgrill = await micelaneusController.createTvGrill(tvgrillEntry);
        res.status(200).json(tvgrill)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

// Obtener una parrilla
router.get('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        const tvgrill = await micelaneusController.getTvGrillById(id)
        res.status(200).json(tvgrill)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

//Actualizar una parrilla
router.put('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        const tvgrillEntry = toNewTvGrillEntry(req.body);
        const tvgrill = await micelaneusController.updateTvGrill(id, tvgrillEntry);
        res.status(200).json(tvgrill)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});
*/

export default router