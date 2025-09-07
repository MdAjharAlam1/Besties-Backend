"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const chat_controllers_1 = require("../controllers/chat.controllers");
const ChatRouter = express_1.default.Router();
ChatRouter.get('/:to', auth_middleware_1.default, chat_controllers_1.fetchChats);
exports.default = ChatRouter;
