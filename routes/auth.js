import {Router} from "express";
import authFunction from "../helpers/authFunction.js";

const authRouter = Router();

//Endpoint publico (no requiere autenticación)
authRouter.get('/public', (req, res) => {
  res.send('Esta es una ruta pública');
})
//Endpoint privado (requiere autenticación)
authRouter.post('/autenticado', (req, res) => {
  const { email, password } = req.body;
  try{
    const user = authFunction(email, password);
    return res.send(`Usuario ${user.name} ha sido autenticado`).status(200);
  }catch(error){
    return res.send(error.message).status(401);
  }
})
//Endpoint autorizado (requiere autenticación y permiso)
authRouter.post('/autorizado', (req, res) => {
  const { email, password } = req.body;
  try{
    const user = authFunction(email, password);
    //403 --> Forbidden
    if (user.role !== 'ADMIN') res.send(403, 'Forbidden');
    return res.send(`Usuario ${user.name} ha sido autorizado`).status(200);
  }catch(error){
    return res.send(error.message).status(401);
  }
})

export default authRouter;