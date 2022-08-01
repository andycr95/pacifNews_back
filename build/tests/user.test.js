"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controllers/userController"));
// Test para el metodo getUser
test('Obtener la lista de usuarios registrados', () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userController_1.default.getUser();
    expect(users).toBeDefined();
}));
// Test para el metodo addUser
test('Registrar un usuario en base de datos', () => __awaiter(void 0, void 0, void 0, function* () {
    const newUserEntry = {
        name: 'Test',
        password: 'Test',
        email: 'andycr93@gmail.com',
        phoneNumber: '123456789'
    };
    const addedUserEntry = yield userController_1.default.addUser(newUserEntry);
    expect(addedUserEntry).toBeDefined();
}));
// Test para el metodo login
test('Iniciar sesion con un usuario', () => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserEntry = {
        email: 'andycr93@gmail.com',
        password: 'Test'
    };
    const user = yield userController_1.default.login(loginUserEntry.email, loginUserEntry.password);
    expect(user).toBeDefined();
}));
// Test para el metodo updateUser
test('Actualizar un usuario en base de datos', () => __awaiter(void 0, void 0, void 0, function* () {
    const id = 1;
    const newUserEntry = {
        name: 'Test Update',
        password: 'Test',
        email: 'andycr93@gmail.com',
        phoneNumber: '123456789'
    };
    const updatedDairyEntry = yield userController_1.default.updateUser(id, newUserEntry);
    expect(updatedDairyEntry).toBeDefined();
}));
// Test para el metodo getUserById
test('Obtener un usuario en base de datos', () => __awaiter(void 0, void 0, void 0, function* () {
    const id = 1;
    const user = yield userController_1.default.getUserById(id);
    expect(user).toBeDefined();
}));
// Test para el metodo deleteUser
test('Eliminar un usuario en base de datos', () => __awaiter(void 0, void 0, void 0, function* () {
    const id = 1;
    const deletedUserEntry = yield userController_1.default.deleteUser(id);
    expect(deletedUserEntry).toBeDefined();
}));
//# sourceMappingURL=user.test.js.map