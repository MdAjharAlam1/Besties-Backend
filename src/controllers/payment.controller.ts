import Razorpay from "razorpay";
import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import crypto from 'crypto'
import fs from 'fs'
import { NoSuchUpload } from "@aws-sdk/client-s3";

const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})

export const createOrder = async(req:Request, res:Response) =>{
    try {
        const amount = req.body?.amount
        if(!amount){
            throw TryError('Amount is required', 4000)
        }

        const payload = {
            amount:(amount * 100),
            currency:process.env.CURRENCY!,
            receipt :`rcp_${Date.now()}`
            

        }

        const order = await razorpay.orders.create(payload)
        res.json(order)
        
    } catch (err) {
        CatchError(err,res,"Failed to create order razorpay")
    }
}

export const webhook = (req:Request, res:Response) =>{
    try {
        const body = req.body
        const signature =  req.headers['x-razorpay-signature']
        if(!signature){
            throw TryError('Invailid Request',400)
        }

        const payload = JSON.stringify(body)
        const generateSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET!).update(payload).digest('hex')
        
        if(signature !== generateSignature){
            throw TryError('Invalid Request',400)
        }

        fs.writeFileSync('payment.json',JSON.stringify(body,null,2))

        if(body.event === "payment.authorized" && process.env.NODE_ENV === "dev"){
            console.log("payment success for dev server")
        }
        if(body.event === "payment.captured" && process.env.NODE_ENV === "prod"){
            console.log("payment success for prod server")
        }

        if(body.event === "payment.failed"){
            console.log("payment Failed")
        }

        res.json({message:"Payment Success"})
        
    } catch (err) {
        CatchError(err,res, "Failed to process webhook")
    }
}