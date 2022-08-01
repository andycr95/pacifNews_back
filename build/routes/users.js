"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const parsers_1 = __importStar(require("../utils/parsers"));
const router = express_1.default.Router();
// Listar todos los usuarios
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userController_1.default.getUser();
    return (users != null)
        ? res.send(users)
        : res.status(404);
}));
// Metodo para registrar un usuario
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUserEntry = (0, parsers_1.default)(req.body);
        const addedUserEntry = yield userController_1.default.addUser(newUserEntry);
        res.status(201).json(addedUserEntry);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
            code: error.code
        });
    }
}));
// Metodo para actualizar un usuario
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const newUserEntry = (0, parsers_1.default)(req.body);
        const updatedUserEntry = yield userController_1.default.updateUser(id, newUserEntry);
        res.json(updatedUserEntry);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
            code: error.code
        });
    }
}));
// Metodo para eliminar un usuario
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const deletedUserEntry = yield userController_1.default.deleteUser(id);
        res.json(deletedUserEntry);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
            code: error.code
        });
    }
}));
// Metodo para saber si un usuario esta logueado
router.get('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const payload = yield userController_1.default.isLoggedIn(token);
    if (payload.hasError) {
        res.status(401).json(payload);
    }
    else {
        res.status(200).json(payload);
    }
}));
// Metodo para iniciar sesion con un usuario
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUserEntry = (0, parsers_1.toLoginUserEntry)(req.body);
        const user = yield userController_1.default.login(loginUserEntry.email, loginUserEntry.password);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
            code: error.code
        });
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map