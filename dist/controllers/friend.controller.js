"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFriendRequest = exports.suggestedFriend = exports.deleteFriend = exports.FriendRequest = exports.fetchFriend = exports.addFriend = void 0;
const error_1 = require("../utils/error");
const friend_model_1 = __importDefault(require("../models/friend.model"));
const auth_models_1 = __importDefault(require("../models/auth.models"));
const mongoose_1 = __importDefault(require("mongoose"));
const addFriend = async (req, res) => {
    try {
        req.body.user = req.session?.id;
        // console.log(req.body , 'middle')
        const friend = await friend_model_1.default.create(req.body);
        // (req.body, 'ajhar')
        // console.log(friend)
        res.json({
            message: "Friend Request Sent"
        });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Failed to send friend request');
    }
};
exports.addFriend = addFriend;
const fetchFriend = async (req, res) => {
    try {
        const userId = req.session?.id;
        const friends = await friend_model_1.default.find({
            status: "accepted",
            $or: [
                { user: userId },
                { friend: userId }
            ]
        }).populate('friend', 'fullname image').populate('user', 'fullname image');
        const modified = friends.map((item) => {
            const isUser = item.user.id.toString() === userId;
            return {
                _id: item._id,
                friend: isUser ? item.friend : item.user,
                status: item.status,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            };
        });
        res.json(modified);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Failed to fetch friends');
    }
};
exports.fetchFriend = fetchFriend;
const FriendRequest = async (req, res) => {
    try {
        if (!req.session) {
            throw (0, error_1.TryError)('failed to fetch friend Request');
        }
        const friends = await friend_model_1.default.find({ friend: req.session.id, status: "requested" }).populate('user', 'fullname image');
        res.json(friends);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'failed to fetch friend request');
    }
};
exports.FriendRequest = FriendRequest;
const deleteFriend = async (req, res) => {
    try {
        const friendId = req.params.id;
        await friend_model_1.default.deleteOne({ _id: friendId });
        res.json({
            message: 'Friend delete Successfully'
        });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Failed to delete friends');
    }
};
exports.deleteFriend = deleteFriend;
const suggestedFriend = async (req, res) => {
    try {
        if (!req.session) {
            throw (0, error_1.TryError)("Failed to suggest friend", 401);
        }
        const friends = await auth_models_1.default.aggregate([
            {
                $match: {
                    _id: {
                        $ne: new mongoose_1.default.Types.ObjectId(req.session.id)
                    }
                }
            },
            {
                $sample: { size: 5 }
            },
            {
                $project: { fullname: 1, image: 1, createdAt: 1 }
            }
        ]);
        const x = await Promise.all(friends.map(async (item) => {
            const count = await friend_model_1.default.countDocuments({ friend: item._id });
            return count === 0 ? item : null;
        }));
        const filters = x.filter((item) => item !== null);
        res.json(filters);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Failed to fetch suggested friends');
    }
};
exports.suggestedFriend = suggestedFriend;
const updateFriendRequest = async (req, res) => {
    try {
        await friend_model_1.default.updateOne({ _id: req.params.id }, {
            $set: {
                status: req.body.status
            }
        });
        res.json({
            message: 'Friend Request Accepted'
        });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Failed to accept friend Request');
    }
};
exports.updateFriendRequest = updateFriendRequest;
