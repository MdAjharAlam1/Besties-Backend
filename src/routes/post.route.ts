import express from 'express'
import { createPost, fetchPost, fetchPostById } from '../controllers/post.controller'

const PostRouter = express.Router()

PostRouter.post('/',createPost)
PostRouter.get('/',fetchPost)
PostRouter.get('/user',fetchPostById)

export default PostRouter