import express from 'express'
import userController from '../controllers/userController';
import toNewUserEntry, { toLoginUserEntry } from '../utils/parsers';

const router = express.Router()

//Listar todos los usuarios
router.get('/', async (_req, res) => {
  const users = await userController.getUser();
  return (users != null)
    ? res.send(users)
    : res.status(404)
})

//Metodo para registrar un usuario
router.post('/', async (req, res) => {
  try {
    const newUserEntry = toNewUserEntry(req.body);
    const addedUserEntry = await userController.addUser(newUserEntry);
    res.status(201).json(addedUserEntry);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
      code: error.code
    });
  }
})

//Metodo para actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const newUserEntry = toNewUserEntry(req.body);
    const updatedUserEntry = await userController.updateUser(id, newUserEntry);
    res.json(updatedUserEntry);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
      code: error.code
    });
  }
});

//Metodo para eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedUserEntry = await userController.deleteUser(id);
    res.json(deletedUserEntry);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
      code: error.code
    });
  }
});

//Metodo para saber si un usuario esta logueado
router.get('/me', async (req, res) => {
  const token = req.headers.authorization
  const payload = await userController.isLoggedIn(token)
  if (payload.hasError) {
    res.status(401).json(payload)
  } else {
    res.status(200).json(payload)
  }
})

//Metodo para iniciar sesion con un usuario
router.post('/login', async (req, res) => {
  try {
    const loginUserEntry = toLoginUserEntry(req.body);
    const user = await userController.login(loginUserEntry.email, loginUserEntry.password);
    res.status(200).json(user)
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
      code: error.code
    });
  }
})

export default router
