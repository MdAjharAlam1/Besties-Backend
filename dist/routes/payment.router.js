"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controllers/payment.controller");
const PaymentRouter = express_1.default.Router();
PaymentRouter.post('/order', payment_controller_1.createOrder);
PaymentRouter.post('/webhook', payment_controller_1.webhook);
exports.default = PaymentRouter;
