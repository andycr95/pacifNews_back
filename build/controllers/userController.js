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
const client_1 = require("@prisma/client");
const jwt_1 = __importDefault(require("../utils/jwt"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
class UserController {
    // Listar todos los usuarios
    static getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma.user.findMany();
                return users;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    // Metodo para obtener un usuario
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { id } });
            if (user == null)
                throw new Error('Usuario no encontrado');
            return user;
        });
    }
    // Agregar un usuario
    static addUser(newDairyEntry) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = yield prisma.user.findMany({ where: { email: newDairyEntry.email } });
                if (email.length > 0)
                    return { error: 'Este correo electronico se encuentra en uso', hasError: true };
                const user = newDairyEntry;
                const salt = yield bcryptjs_1.default.genSalt(10);
                user.password = yield bcryptjs_1.default.hash(user.password, salt);
                const addedDairyEntry = yield prisma.user.create({
                    data: {
                        name: user.name,
                        password: user.password,
                        email: user.email,
                        phoneNumber: user.phoneNumber
                    }
                });
                return addedDairyEntry;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    // Actualizar un usuario
    static updateUser(id, newDairyEntry) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findUnique({ where: { id } });
                if (user == null)
                    throw new Error('Usuario no encontrado');
                const updatedDairyEntry = yield prisma.user.update({
                    where: { id },
                    data: {
                        name: newDairyEntry.name,
                        password: newDairyEntry.password,
                        email: newDairyEntry.email,
                        phoneNumber: newDairyEntry.phoneNumber
                    }
                });
                return updatedDairyEntry;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    // Eliminar un usuario
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findUnique({ where: { id } });
                if (user == null)
                    throw new Error('Usuario no encontrado');
                const deletedDairyEntry = yield prisma.user.delete({ where: { id } });
                return deletedDairyEntry;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    // Inicio de sesion
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { email } });
            if (user == null)
                throw new Error('Usuario no encontrado');
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error('Contraseña incorrecta');
            const token = yield jwt_1.default.signAccessToken({ id: user.id });
            return { user, token };
        });
    }
    // Verificar si un usuario esta logueado
    static isLoggedIn(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                return { error: 'No token provided', hasError: true };
            try {
                const payload = yield jwt_1.default.verifyAccessToken(token);
                return { user: payload, token, hasError: false };
            }
            catch (error) {
                return { error: 'Unauthorized', hasError: true };
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map