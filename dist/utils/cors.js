"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CorsConfig = {
    origin: process.env.CLIENT,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
};
exports.default = CorsConfig;
