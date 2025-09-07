"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    attachment: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: null
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });
const PostModel = mongoose_1.default.model('Post', postSchema);
exports.default = PostModel;
