"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const PostRouter = express_1.default.Router();
PostRouter.post('/', post_controller_1.createPost);
PostRouter.get('/', post_controller_1.fetchPost);
PostRouter.get('/user', post_controller_1.fetchPostById);
exports.default = PostRouter;
