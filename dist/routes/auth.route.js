"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const refresh_middleware_1 = __importDefault(require("../middlewares/refresh.middleware"));
const AuthRouter = express_1.default.Router();
AuthRouter.post('/signup', auth_controller_1.Signup);
AuthRouter.post('/login', auth_controller_1.Login);
AuthRouter.get('/session', auth_controller_1.getSession);
AuthRouter.put('/profile-picture', auth_middleware_1.default, auth_controller_1.updateProfilePicture);
AuthRouter.get('/refresh-token', refresh_middleware_1.default, auth_controller_1.refreshToken);
AuthRouter.post('/logout', auth_middleware_1.default, auth_controller_1.Logout);
exports.default = AuthRouter;
