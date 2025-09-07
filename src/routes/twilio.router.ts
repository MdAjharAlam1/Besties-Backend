import express from 'express'
import {getTurnServer} from '../controllers/twilio.controller'
import AuthMiddleware from '../middlewares/auth.middleware'

const TwilioRouter = express.Router()

TwilioRouter.get('/turn-server', AuthMiddleware, getTurnServer)

export default TwilioRouter