"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../utils/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            throw (0, error_1.TryError)('Failed to unautorized user', 401);
        }
        const payload = await jsonwebtoken_1.default.verify(accessToken, process.env.AUTH_SECRET);
        req.session = {
            id: payload.id,
            fullname: payload.fullname,
            mobile: payload.mobile,
            email: payload.email,
            image: payload.image
        };
        next();
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Unauthorized");
    }
};
exports.default = AuthMiddleware;
