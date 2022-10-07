import express from 'express'
import newsController from '../controllers/newsController'


const router = express.Router()

// Listar todos los articulos
router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const news = await newsController.getNews(page, limit)
    res.status(200).json(news)
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
})

// Listar todas las novedaes
router.get('/latest', async (_req, res) => {
  try {
    const news = await newsController.getNewNews()
    res.status(200).json(news)
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
})

//Registro masivo de articulos
/*router.post('/bulk', async (req, res) => {
    try {
        const news = await newsController.createNews(req.body);
        res.status(200).json(news)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});*/


// Obtener una novedad
router.get('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        const newId = await newsController.getNewById(id)
        res.status(200).json(newId)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

// Registrar novedades
/*router.post('/', async (req, res) => {
    const token = req.headers.authorization
    try {
      await userController.isLoggedIn(token)
      const newNewEntry = req.body
      const addedNewEntry = await newsController.addNews(newNewEntry)
      res.status(201).json(addedNewEntry)
    } catch (error: any) {
      console.log(error);
      res.status(400).json({error: error.message})
    }
  })

  // Metodo para actualizar una novedad
router.put('/:id', async (req, res) => {
    const token = req.headers.authorization
    try {
      await userController.isLoggedIn(token)
      const id = Number(req.params.id)
      const newNewEntry = req.body
      const updatedNewsEntry = await newsController.updateNew(id, newNewEntry)
      res.json(updatedNewsEntry)
    } catch (error: any) {
      console.log(error);
      res.status(400).json({error: error.message})
    }
  })

  // Metodo para eliminar una novedad
router.delete('/:id', async (req, res) => {
    const token = req.headers.authorization
    try {
      await userController.isLoggedIn(token)
      const id = Number(req.params.id)
      const deletedNewEntry = await newsController.deleteNew(id)
      res.json(deletedNewEntry)
    } catch (error: any) {
      console.log(error);
      res.status(400).json({error: error.message})
    }
  })
*/

export default router