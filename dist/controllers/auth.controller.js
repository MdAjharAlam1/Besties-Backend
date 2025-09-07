"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.updateProfilePicture = exports.getSession = exports.forgotPassword = exports.refreshToken = exports.Login = exports.Signup = void 0;
const auth_models_1 = __importDefault(require("../models/auth.models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
const error_1 = require("../utils/error");
const accessTokenExpires = '7d';
const accessTokenExpiresInTenMinutes = (7 * 24 * 60 * 60) * 1000;
const refreshTokenExpiresInSevenDays = (7 * 24 * 60 * 60) * 1000;
const generateToken = async (payload) => {
    const accessToken = await jsonwebtoken_1.default.sign(payload, process.env.AUTH_SECRET, { expiresIn: accessTokenExpires });
    const refreshToken = (0, uuid_1.v4)();
    return {
        refreshToken,
        accessToken
    };
};
const getCookiesOptions = (tokenType) => {
    return {
        httpOnly: true,
        maxAge: tokenType === "at" ? accessTokenExpiresInTenMinutes : refreshTokenExpiresInSevenDays,
        secure: process.env.NODE_ENV === "dev" ? false : true,
        samesite: "none",
        domain: process.env.NODE_ENV === "dev" ? "localhost" : process.env.CLIENT.split("//").pop()
    };
};
const Signup = async (req, res) => {
    try {
        await auth_models_1.default.create(req.body);
        res.json({
            message: 'Signup Successfully'
        });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Signup Failed ! Please try again later");
    }
};
exports.Signup = Signup;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await auth_models_1.default.findOne({ email: email });
        if (!user) {
            throw (0, error_1.TryError)('User not found, Please try first signup', 404);
        }
        const isLogin = await bcrypt_1.default.compare(password, user.password);
        if (!isLogin) {
            throw (0, error_1.TryError)('Invailid Credential Email and Password', 401);
        }
        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
            image: user.image
        };
        const { refreshToken, accessToken } = await generateToken(payload);
        await auth_models_1.default.updateOne({ _id: user._id }, {
            $set: {
                refreshToken,
                expiry: (0, moment_1.default)().add(7, 'days').toDate()
            }
        });
        res.cookie('accessToken', accessToken, getCookiesOptions('at'));
        res.cookie('refreshToken', refreshToken, getCookiesOptions('rt'));
        res.json({
            message: 'Login Success',
        });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Login Failed ! Please Try After sometimes");
    }
};
exports.Login = Login;
const refreshToken = async (req, res) => {
    try {
        if (!req.session) {
            throw (0, error_1.TryError)('Failed to refresh token', 401);
        }
        const { accessToken, refreshToken } = await generateToken(req.session);
        await auth_models_1.default.updateOne({ _id: req.session.id }, {
            $set: {
                refreshToken,
                expiry: (0, moment_1.default)().add(7, 'days').toDate()
            }
        });
        res.cookie('accessToken', accessToken, getCookiesOptions('at'));
        res.cookie('refreshToken', refreshToken, getCookiesOptions('rt'));
        res.json({
            message: 'Token refresh'
        });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Failed to refresh token');
    }
};
exports.refreshToken = refreshToken;
const forgotPassword = async (req, res) => {
    res.send("hello");
};
exports.forgotPassword = forgotPassword;
const getSession = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            throw (0, error_1.TryError)('Invalid Session', 401);
        }
        const session = jsonwebtoken_1.default.verify(accessToken, process.env.AUTH_SECRET);
        res.json(session);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Invalid session');
    }
};
exports.getSession = getSession;
const updateProfilePicture = async (req, res) => {
    try {
        const path = `${process.env.S3_URL}/${req.body.path}`;
        if (!path || !req.session) {
            throw (0, error_1.TryError)('Failed to update profile picture', 400);
        }
        await auth_models_1.default.updateOne({ _id: req.session.id }, { $set: { image: path } });
        res.json({ image: path });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Failed to update profile picture');
    }
};
exports.updateProfilePicture = updateProfilePicture;
const Logout = (req, res) => {
    try {
        const options = {
            httpOnly: true,
            maxAge: 0,
            secure: false,
            domain: 'localhost'
        };
        res.clearCookie('accessToken', options);
        res.clearCookie('refreshToken', options);
        res.json({
            message: 'Logout Successfully'
        });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Failed to logout');
    }
};
exports.Logout = Logout;
