import express from 'express'
import userController from '../controllers/userController';
import toNewUserEntry, { toLoginUserEntry } from '../utils/parsers';

const router = express.Router()

router.get('/', async (_req, res) => {
  const users = await userController.getUser();
  return (users != null)
    ? res.send(users)
    : res.status(404)
})

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

router.get('/me', async (req, res) => {
  const token = req.headers.authorization
  const payload = await userController.isLoggedIn(token)
  if (payload.hasError) {
    res.status(401).json(payload)
  } else {
    res.status(200).json(payload)
  }
})

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
