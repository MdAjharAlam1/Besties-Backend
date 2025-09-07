"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authSchema = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    refreshToken: {
        type: String
    },
    expiry: {
        type: Date
    }
}, { timestamps: true });
authSchema.pre('save', async function (next) {
    this.password = await bcrypt_1.default.hash(this.password, 12);
    next();
});
authSchema.pre('save', function (next) {
    this.refreshToken = null;
    this.expiry = null;
    next();
});
const AuthModel = mongoose_1.default.model('Auth', authSchema);
exports.default = AuthModel;
