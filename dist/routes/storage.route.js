"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storage_controller_1 = require("../controllers/storage.controller");
const StorageRouter = express_1.default.Router();
StorageRouter.post('/download', storage_controller_1.downloadFile),
    StorageRouter.post('/upload', storage_controller_1.uploadFile);
exports.default = StorageRouter;
