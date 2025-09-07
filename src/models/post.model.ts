import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:"Auth",
        required:true
    },
    attachment:{
        type:String,
        default:null
    },
    type:{
        type:String,
        default:null
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

const PostModel = mongoose.model('Post',postSchema)
export default PostModel