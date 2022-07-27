import express from 'express'
import UserModel from '../models/user'

const router = express.Router()

router.get('/', async (_req, res) => {
  const users = UserModel.find()
  res.json(users)
})

// router.get('/:id', (req, res) => {
//   const dairy = userService.findById(+req.params.id)
//   return (dairy != null)
//     ? res.send(dairy)
//     : res.sendStatus(404)
// })

// router.post('/', (req, res) => {
//   try {
//     const newDairyEntry = toNewDairyEntry(req.body)
//     const addedDairyEntry = userService.addDairy(newDairyEntry)
//     res.json(addedDairyEntry)
//   } catch (err: any) {
//     res.status(400).send(err.message)
//   }
// })

export default router
