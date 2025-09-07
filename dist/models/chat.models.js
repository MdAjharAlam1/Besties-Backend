"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    from: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    to: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    files: {
        path: {
            type: String
        },
        type: {
            type: String
        }
    }
}, { timestamps: true });
const ChatModel = mongoose_1.default.model("Chat", chatSchema);
exports.default = ChatModel;
