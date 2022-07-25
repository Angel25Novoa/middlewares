import { Router } from "express";
import { USERS_BBDD } from "../bbdd.js";
import authFunction from "../helpers/authFunction.js"
import { SignJWT, jwtVerify} from 'jose'

const authTokenRouter = Router();

authTokenRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.send('Email and password are required').status(400);
  try{
    const {_id} = authFunction(email, password);
    const jtwCosntructor = new SignJWT({_id})
    const encoder = new TextEncoder();
    const jwt = await jtwCosntructor
    .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encoder.encode(process.env.JWT_SECRET))
    return res.send({jwt}).status(200);
  } catch(error) {
    return res.sendStatus(401);
  }
})

authTokenRouter.get("/profile", async (req, res) => {
  const {authorization} = req.headers;
  if(!authorization) return res.sendStatus(401);
  try{
    const encoder = new TextEncoder();
    const {payload} = await jwtVerify(authorization, encoder.encode(process.env.JWT_SECRET))
    const user = USERS_BBDD.find(user => user._id === payload._id);
    if(!user) return res.sendStatus(401);
    delete user.password;
    return res.send(user).status(200);
  } catch(err) {
    return res.sendStatus(401);
  }
})

export default authTokenRouter;