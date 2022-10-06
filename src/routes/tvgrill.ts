import express from 'express'
/*import micelaneusController from '../controllers/micelaneusController'
import toNewTvGrillEntry from '../utils/micelaneusParsers'*/

const router = express.Router()

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