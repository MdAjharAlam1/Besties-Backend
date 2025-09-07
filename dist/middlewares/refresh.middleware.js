"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../utils/error");
const auth_models_1 = __importDefault(require("../models/auth.models"));
const moment_1 = __importDefault(require("moment"));
const refreshTokenMiddleware = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        // console.log(refreshToken)
        if (!refreshToken) {
            throw (0, error_1.TryError)('Failed to refresh token', 401);
        }
        const user = await auth_models_1.default.findOne({ refreshToken });
        // console.log(user)
        if (!user) {
            throw (0, error_1.TryError)('Failed to refresh token', 401);
        }
        const expiry = (0, moment_1.default)(user.expiry);
        const todayDate = (0, moment_1.default)();
        const isExpired = todayDate.isAfter(expiry);
        if (isExpired) {
            throw (0, error_1.TryError)('Failed to refresh token', 401);
        }
        req.session = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
            image: user.image
        };
        next();
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'failed to refresh token');
    }
};
exports.default = refreshTokenMiddleware;
