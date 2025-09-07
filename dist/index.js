"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.DB);
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const cors_2 = __importDefault(require("./utils/cors"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on ${process.env.PORT}`);
});
//socket connection
const status_socket_1 = __importDefault(require("./socket/status.socket"));
const chat_socket_1 = __importDefault(require("./socket/chat.socket"));
const video_socket_1 = __importDefault(require("./socket/video.socket"));
const io = new socket_io_1.Server(server, { cors: cors_2.default });
(0, status_socket_1.default)(io);
(0, chat_socket_1.default)(io);
(0, video_socket_1.default)(io);
// Middlewares
app.use((0, cors_1.default)(cors_2.default));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const storage_route_1 = __importDefault(require("./routes/storage.route"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
const friend_route_1 = __importDefault(require("./routes/friend.route"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const swagger_ui_express_1 = require("swagger-ui-express");
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const twilio_router_1 = __importDefault(require("./routes/twilio.router"));
const payment_router_1 = __importDefault(require("./routes/payment.router"));
const post_route_1 = __importDefault(require("./routes/post.route"));
//Endpoints
app.use('/api-docs', swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(swagger_1.default));
app.use('/auth', auth_route_1.default);
app.use('/storage', auth_middleware_1.default, storage_route_1.default);
app.use('/friend', auth_middleware_1.default, friend_route_1.default);
app.use('/chat', auth_middleware_1.default, chat_route_1.default);
app.use('/twilio', auth_middleware_1.default, twilio_router_1.default);
app.use('/post', auth_middleware_1.default, post_route_1.default);
app.use('/payment', payment_router_1.default);
