"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VideoScoket = (io) => {
    io.on('connection', (socket) => {
        console.log("User Connected");
        socket.on("offer", ({ offer, to, from, type }) => {
            from.socketId = socket.id;
            io.to(to).emit("offer", { offer, from, type });
        });
        socket.on("candidate", ({ candidate, to }) => {
            io.to(to).emit("candidate", {
                candidate,
                from: socket.id
            });
        });
        socket.on("answer", ({ answer, to }) => {
            // console.log(answer,to)
            io.to(to).emit("answer", { answer, from: socket.id });
        });
        socket.on("end", ({ to }) => {
            io.to(to).emit("end", { from: socket.id });
        });
    });
};
exports.default = VideoScoket;
