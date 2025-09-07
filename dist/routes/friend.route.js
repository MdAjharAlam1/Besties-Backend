"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friend_controller_1 = require("../controllers/friend.controller");
const FriendRouter = express_1.default.Router();
FriendRouter.post('/', friend_controller_1.addFriend);
FriendRouter.get('/all', friend_controller_1.fetchFriend);
FriendRouter.get('/suggestion', friend_controller_1.suggestedFriend);
FriendRouter.get('/request', friend_controller_1.FriendRequest);
FriendRouter.put('/:id', friend_controller_1.updateFriendRequest);
FriendRouter.delete('/:id', friend_controller_1.deleteFriend);
exports.default = FriendRouter;
