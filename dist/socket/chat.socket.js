"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_controllers_1 = require("../controllers/chat.controllers");
const S3_1 = require("../utils/S3");
const ChatSocket = (io) => {
    io.on('connection', (socket) => {
        socket.on('message', (payload) => {
            (0, chat_controllers_1.createChats)({
                ...payload,
                from: payload.from.id
            });
            io.to(payload.to).emit('message', {
                from: payload.from,
                message: payload.message
            });
        });
        socket.on("attachment", async (payload) => {
            (0, chat_controllers_1.createChats)({
                ...payload,
                from: payload.from.id
            });
            io.to(payload.to).emit("attachment", {
                from: payload.from,
                message: payload.message,
                files: {
                    path: await (0, S3_1.downloadObject)(payload.files.path),
                    type: payload.files.type
                }
            });
        });
    });
};
exports.default = ChatSocket;
