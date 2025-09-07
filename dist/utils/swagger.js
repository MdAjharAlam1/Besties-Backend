"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_swagger_1 = __importDefault(require("../swagger/auth.swagger"));
const storage_swagger_1 = __importDefault(require("../swagger/storage.swagger"));
const friend_swagger_1 = __importDefault(require("../swagger/friend.swagger"));
const SwaggerConfig = {
    openapi: '3.0.0',
    info: {
        title: "Besties Official Api",
        description: 'All the private or public listed here',
        version: '1.0.0',
        contact: {
            name: 'Md Ajhar Alam',
            email: 'mdajharalam68@gmail.com'
        }
    },
    servers: [
        { url: process.env.SERVER }
    ],
    paths: {
        ...auth_swagger_1.default,
        ...storage_swagger_1.default,
        ...friend_swagger_1.default
    }
};
exports.default = SwaggerConfig;
