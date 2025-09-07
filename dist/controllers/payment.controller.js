"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = exports.createOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const error_1 = require("../utils/error");
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
const createOrder = async (req, res) => {
    try {
        const amount = req.body?.amount;
        if (!amount) {
            throw (0, error_1.TryError)('Amount is required', 4000);
        }
        const payload = {
            amount: (amount * 100),
            currency: process.env.CURRENCY,
            receipt: `rcp_${Date.now()}`
        };
        const order = await razorpay.orders.create(payload);
        res.json(order);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to create order razorpay");
    }
};
exports.createOrder = createOrder;
const webhook = (req, res) => {
    try {
        const body = req.body;
        const signature = req.headers['x-razorpay-signature'];
        if (!signature) {
            throw (0, error_1.TryError)('Invailid Request', 400);
        }
        const payload = JSON.stringify(body);
        const generateSignature = crypto_1.default.createHmac('sha256', process.env.RAZORPAY_SECRET).update(payload).digest('hex');
        if (signature !== generateSignature) {
            throw (0, error_1.TryError)('Invalid Request', 400);
        }
        fs_1.default.writeFileSync('payment.json', JSON.stringify(body, null, 2));
        if (body.event === "payment.authorized" && process.env.NODE_ENV === "dev") {
            console.log("payment success for dev server");
        }
        if (body.event === "payment.captured" && process.env.NODE_ENV === "prod") {
            console.log("payment success for prod server");
        }
        if (body.event === "payment.failed") {
            console.log("payment Failed");
        }
        res.json({ message: "Payment Success" });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to process webhook");
    }
};
exports.webhook = webhook;
