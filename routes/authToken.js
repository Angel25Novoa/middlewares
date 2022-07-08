import { Router } from "express";
import authFunction from "../helpers/authFunction.js";

const authTokenRouter = Router();

authTokenRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.send('Email and password are required').status(400);
  try{
    const user = authFunction(email, password);
    return res.send(`Usuario ${user.name} ha sido autenticado`).status(200);
  }catch(error){
    return res.sendStatus(401);
  }
})

export default authTokenRouter;