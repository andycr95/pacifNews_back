import express from 'express'
import articleController from '../controllers/articleController'
import toNewArticleEntry from '../utils/articleParsers'

const router = express.Router()

// Listar todos los articulos
router.get('/', async (_req, res) => {
  try {
    const articles = await articleController.getArticles()
    res.status(200).json(articles)
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
})

// Listar todos los articulos
router.get('/latest', async (_req, res) => {
  try {
    const articles = await articleController.getNewsArticles()
    res.status(200).json(articles)
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
})

// Lista de articulos populares
router.get('/popular', async (_req, res) => {
  try {
    const articles = await articleController.getPopularArticles()
    res.status(200).json(articles)
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
});

// Registrar articulos
router.post('/', async (req, res) => {
    try {
        const articleEntry = toNewArticleEntry(req.body);
        const article = await articleController.createArticle(articleEntry);
        res.status(200).json(article)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

//Registro masivo de articulos
router.post('/bulk', async (req, res) => {
    try {
        const articles = await articleController.createArticles(req.body);
        res.status(200).json(articles)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

// Obtener un articulo
router.get('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        const article = await articleController.getArticleById(id)
        res.status(200).json(article)
    } catch (error: any) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});


export default router