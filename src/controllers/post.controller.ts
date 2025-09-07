import { SessionInterface } from "../middlewares/auth.middleware";
import { Response } from "express";
import { CatchError, TryError } from "../utils/error";
import PostModel from "../models/post.model";

export const createPost = async(req:SessionInterface, res:Response) => {
    try {
        req.body.user = req.session?.id
        const post = await PostModel.create(req.body)
        res.json(post)
        
    } catch (err) {
        CatchError(err,res,'Failed to create post')
    }
}

export const fetchPost = async(req:SessionInterface, res:Response) =>{
    try {

        const posts = await PostModel.find().sort({createdAt:-1})
        res.json(posts)

        
    } catch (err) {
        CatchError(err,res,'Failed to fetch post')
    }
}

export const fetchPostById = async(req:SessionInterface, res:Response) =>{
    try {
        if(!req.session){
            throw TryError('Invalid Session',400)
        }
        const posts = await PostModel.find({user: req.session.id}).sort({createdAt:-1})
        res.json(posts)
        
    } catch (err) {
        CatchError(err,res,'Failed to fetch post by userid')
    }
}