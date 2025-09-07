"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie = __importStar(require("cookie"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const onlineUsers = new Map();
const StatusSocket = (io) => {
    io.on('connection', (socket) => {
        try {
            const rawCookies = socket.handshake.headers.cookie || "";
            const cookies = cookie.parse(rawCookies);
            const accessToken = cookies.accessToken;
            if (!accessToken) {
                throw new Error("Access token not found");
            }
            const user = jsonwebtoken_1.default.verify(accessToken, process.env.AUTH_SECRET);
            onlineUsers.set(user.id, { ...user, socketId: socket.id });
            socket.join(user.id);
            // console.log(onlineUsers);
            io.emit("online", Array.from(onlineUsers.values()));
            // Scoped event for the specific socket
            socket.on("get-online", () => {
                socket.emit("online", Array.from(onlineUsers.values()));
            });
            socket.on("disconnect", () => {
                onlineUsers.forEach((value, key) => {
                    if (value.socketId === socket.id) {
                        onlineUsers.delete(key);
                    }
                });
                io.emit("online", Array.from(onlineUsers.values()));
            });
        }
        catch (err) {
            if (err instanceof Error) {
                socket.disconnect();
            }
        }
        //         const  rawCookies = socket.handshake.headers.cookie || ""
        //         const cookies = cookie.parse(rawCookies)
        //         const accessToken = cookies.accessToken
        //         if(!accessToken) {
        //             throw new Error('access token not found')
        //         }
        //         const user = jwt.verify(accessToken, process.env.AUTH_SECRET!)
        //         onlineUsers.set(socket.id, user)
        //         console.log(onlineUsers)
        //         io.emit('online', Array.from(onlineUsers.values()))
        //         io.on("get-online",()=>{
        //             io.emit('online', Array.from(onlineUsers.values()))
        //         })
        //         socket.on('disconnect', ()=>{
        //             onlineUsers.delete(socket.id)
        //             io.emit('online', Array.from(onlineUsers.values()))
        //         })
        //    } catch (err) {
        //         if(err instanceof Error){
        //             console.log(err.message)
        //             socket.disconnect()
        //         }
        //    }
    });
};
exports.default = StatusSocket;
