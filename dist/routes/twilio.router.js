"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const twilio_controller_1 = require("../controllers/twilio.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const TwilioRouter = express_1.default.Router();
TwilioRouter.get('/turn-server', auth_middleware_1.default, twilio_controller_1.getTurnServer);
exports.default = TwilioRouter;
