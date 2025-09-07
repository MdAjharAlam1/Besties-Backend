import { Request, Response } from 'express'
import twilio from 'twilio'
import { CatchError } from '../utils/error'

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

export const getTurnServer = async(req:Request, res:Response)=>{
    try {
        const {iceServers} = await client.tokens.create()
        res.json(iceServers)
    } catch (err) {
        CatchError(err,res,'Failed to generate turn server')
    }
}
