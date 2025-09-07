"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchChats = exports.createChats = void 0;
const chat_models_1 = __importDefault(require("../models/chat.models"));
const error_1 = require("../utils/error");
const S3_1 = require("../utils/S3");
const createChats = (payload) => {
    chat_models_1.default.create(payload)
        .catch((err) => console.log(err.message));
};
exports.createChats = createChats;
const fetchChats = async (req, res) => {
    try {
        if (!req.session) {
            throw new Error("Failed to fetch Chats");
        }
        const chats = await chat_models_1.default.find({
            $or: [
                { from: req.session.id, to: req.params.to },
                { from: req.params.to, to: req.session.id }
            ]
        })
            .populate("from", "fullname image email mobile")
            .lean();
        const modifiedChats = await Promise.all(chats.map(async (item) => {
            if (item.files) {
                return {
                    ...item,
                    files: {
                        path: item.files.path && await (0, S3_1.downloadObject)(item.files.path),
                        type: item.files.type
                    }
                };
            }
            else {
                return item;
            }
        }));
        res.json(modifiedChats);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to fetch Chats");
    }
};
exports.fetchChats = fetchChats;
