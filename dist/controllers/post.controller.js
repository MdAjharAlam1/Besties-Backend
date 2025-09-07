"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPostById = exports.fetchPost = exports.createPost = void 0;
const error_1 = require("../utils/error");
const post_model_1 = __importDefault(require("../models/post.model"));
const createPost = async (req, res) => {
    try {
        req.body.user = req.session?.id;
        const post = await post_model_1.default.create(req.body);
        res.json(post);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Failed to create post');
    }
};
exports.createPost = createPost;
const fetchPost = async (req, res) => {
    try {
        const posts = await post_model_1.default.find().sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Failed to fetch post');
    }
};
exports.fetchPost = fetchPost;
const fetchPostById = async (req, res) => {
    try {
        if (!req.session) {
            throw (0, error_1.TryError)('Invalid Session', 400);
        }
        const posts = await post_model_1.default.find({ user: req.session.id }).sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, 'Failed to fetch post by userid');
    }
};
exports.fetchPostById = fetchPostById;
