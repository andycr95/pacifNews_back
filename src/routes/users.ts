import express from 'express'
import userController from '../controllers/userController'
import toNewUserEntry, { toLoginUserEntry } from '../utils/parsers'

const router = express.Router()

// Listar todos los usuarios
router.get('/', async (req, res) => {
  const token = req.headers.authorization
  try {
    await userController.isLoggedIn(token)
    const users = await userController.getUser()
    res.status(200).json(users)
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
})

// Metodo para registrar un usuario
router.post('/', async (req, res) => {
  const token = req.headers.authorization
  try {
    await userController.isLoggedIn(token)
    const newUserEntry = toNewUserEntry(req.body)
    const addedUserEntry = await userController.addUser(newUserEntry)
    res.status(201).json(addedUserEntry)
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
})

// Metodo para actualizar un usuario
router.put('/:id', async (req, res) => {
  const token = req.headers.authorization
  try {
    await userController.isLoggedIn(token)
    const id = Number(req.params.id)
    const newUserEntry = toNewUserEntry(req.body)
    const updatedUserEntry = await userController.updateUser(id, newUserEntry)
    res.json(updatedUserEntry)
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
})

// Metodo para eliminar un usuario
router.delete('/:id', async (req, res) => {
  const token = req.headers.authorization
  try {
    await userController.isLoggedIn(token)
    const id = Number(req.params.id)
    const deletedUserEntry = await userController.deleteUser(id)
    res.json(deletedUserEntry)
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
})

// Metodo para saber si un usuario esta logueado
router.get('/me', async (req, res) => {
  const token = req.headers.authorization
  try {
    const payload = await userController.isLoggedIn(token)
    res.status(200).json(payload) 
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
})

// Metodo para iniciar sesion con un usuario
router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const loginUserEntry = toLoginUserEntry(req.body)
    const user = await userController.login(loginUserEntry.email, loginUserEntry.password)
    res.status(200).json(user)
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
})

// Metodo para iniciar sesion con un usuario
router.post('/validate', async (req, res) => {
  try {
    const loginUserEntry = toLoginUserEntry(req.body)
    const user = await userController.validate(loginUserEntry)
    res.status(200).json(user)
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
})

export default router
