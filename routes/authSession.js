import { Router } from "express";
import { nanoid } from "nanoid";
import { USERS_BBDD } from "../bbdd.js";
import authFunction from "../helpers/authFunction.js";

const sessions = []
const authSessionRouter = Router();

authSessionRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.send('Email and password are required').status(400);
  try{
    const {_id} = authFunction(email, password);
    const sessionId = nanoid();
    sessions.push({
      sessionId, _id
    })
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
    })
    return res.send();
  }catch(error){
    return res.sendStatus(401);
  }
})

authSessionRouter.get('/profile', (req, res) => {
  const {cookies} = req;
  if(!cookies.sessionId) return res.sendStatus(401);
  const userSession = sessions.find(
    (session) => session.sessionId === cookies.sessionId);
  if(!userSession) return res.sendStatus(401);
  USERS_BBDD.find(user => user._id === session._id)
  if(!user) return res.sendStatus(401);
  delete user.password;
  return res.send(user)
})

export default authSessionRouter;