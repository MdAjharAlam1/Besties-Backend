"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTurnServer = void 0;
const twilio_1 = __importDefault(require("twilio"));
const error_1 = require("../utils/error");
const client = (0, twilio_1.default)(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const getTurnServer = async (req, res) => {
    try {
        const { iceServers } = await client.tokens.create();
        res.json(iceServers);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Failed to generate turn server');
    }
};
exports.getTurnServer = getTurnServer;
