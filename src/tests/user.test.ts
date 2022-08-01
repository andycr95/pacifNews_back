import userController from '../controllers/userController'

// Test para el metodo getUser
test('Obtener la lista de usuarios registrados', async () => {
  const users = await userController.getUser()
  expect(users).toBeDefined()
})

// Test para el metodo addUser
test('Registrar un usuario en base de datos', async () => {
  const newUserEntry = {
    name: 'Test',
    password: 'Test',
    email: 'andycr93@gmail.com',
    phoneNumber: '123456789'
  }
  const addedUserEntry = await userController.addUser(newUserEntry)
  expect(addedUserEntry).toBeDefined()
})

// Test para el metodo login
test('Iniciar sesion con un usuario', async () => {
  const loginUserEntry = {
    email: 'andycr93@gmail.com',
    password: 'Test'
  }
  const user = await userController.login(loginUserEntry.email, loginUserEntry.password)
  expect(user).toBeDefined()
})

// Test para el metodo updateUser
test('Actualizar un usuario en base de datos', async () => {
  const id = 1
  const newUserEntry = {
    name: 'Test Update',
    password: 'Test',
    email: 'andycr93@gmail.com',
    phoneNumber: '123456789'
  }
  const updatedDairyEntry = await userController.updateUser(id, newUserEntry)
  expect(updatedDairyEntry).toBeDefined()
})

// Test para el metodo getUserById
test('Obtener un usuario en base de datos', async () => {
  const id = 1
  const user = await userController.getUserById(id)
  expect(user).toBeDefined()
})

// Test para el metodo deleteUser
test('Eliminar un usuario en base de datos', async () => {
  const id = 1
  const deletedUserEntry = await userController.deleteUser(id)
  expect(deletedUserEntry).toBeDefined()
})
