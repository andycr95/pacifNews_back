"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLoginUserEntry = void 0;
const parseName = (nameFromRequest) => {
    if (!isString(nameFromRequest) || !isMajor(nameFromRequest, 3)) {
        throw new Error('Campo nombre invalido o vacio');
    }
    return nameFromRequest;
};
const isString = (string) => {
    return typeof string === 'string';
};
const parsePassword = (passwordFromRequest) => {
    if (!isString(passwordFromRequest) || !isMajor(passwordFromRequest, 8)) {
        throw new Error('Campo contraseña invalido o vacio');
    }
    return passwordFromRequest;
};
const isMajor = (data, length) => {
    return Boolean(data.length > length);
};
const isEmail = (email) => {
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailFormat.test(email);
};
const parseEmail = (emailFromRequest) => {
    if (!isString(emailFromRequest) || !isEmail(emailFromRequest)) {
        throw new Error('Campo correo invalido o vacio');
    }
    return emailFromRequest;
};
const parsePhoneNumber = (phoneNumberFromRequest) => {
    if (!isString(phoneNumberFromRequest)) {
        throw new Error('Campo telefono invalido');
    }
    return phoneNumberFromRequest;
};
const toNewUserEntry = (entry) => {
    const newEntry = {
        name: parseName(entry.name),
        password: parsePassword(entry.password),
        email: parseEmail(entry.email),
        phoneNumber: parsePhoneNumber(entry.phoneNumber)
    };
    return newEntry;
};
const toLoginUserEntry = (entry) => {
    const loginEntry = {
        password: parsePassword(entry.password),
        email: parseEmail(entry.email)
    };
    return loginEntry;
};
exports.toLoginUserEntry = toLoginUserEntry;
exports.default = toNewUserEntry;
//# sourceMappingURL=parsers.js.map