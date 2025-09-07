"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchError = exports.TryError = void 0;
const TryError = (message, status = 500) => {
    const err = new Error(message);
    err.status = status;
    return err;
};
exports.TryError = TryError;
const CatchError = (err, res, prodMessage = "Internal Server Error") => {
    if (err instanceof Error) {
        const message = process.env.NODE_ENV === "dev" ? err.message : prodMessage;
        const status = err.status || 500;
        res.status(status).json({ message });
    }
};
exports.CatchError = CatchError;
