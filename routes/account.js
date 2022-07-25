import {Router} from "express";
import {USERS_BBDD} from '../bbdd.js'

//Se crea un router en express para hacer el código mas legible
const accountRouter = Router();

accountRouter.use((req, res, next) => {
  console.log(req.ip)
  //?next es una función callback que se ejecuta cuando termina la ejecución de el middleware y deja que el flujo del programa siga
  next()
})

//*Obtener los detalles de una cuenta a partir del guid
accountRouter.get('/:_id', (req, res) => {
  const {_id} = req.params
  const user = USERS_BBDD.find(user => user._id === _id)
  if(!user) return res.status(404).send('No existe el usuario')
  res.send(user)
})

//*Crear una nueva cuenta
accountRouter.post('/', (req, res) => {
  const {name, _id} = req.body
  if(!name || !_id) return res.status(400).send('No se ha especificado el nombre')
  const user = USERS_BBDD.find(user => user._id === _id)
  if(user) return res.status(409).send('El usuario ya existe')
  USERS_BBDD.push({name, _id})
  res.send('El usuario ha sido creado')
})

//*Actualizar el nombre una cuenta
accountRouter.patch('/:_id', (req, res) => {
  const {_id} = req.params
  const {name} = req.body
  if(!name) return res.status(400).send('No se ha especificado el nombre')
  const user = USERS_BBDD.find(user => user._id === _id)
  if(!user) return res.status(404).send('No existe el usuario') 
  user.name = name
  res.send()
})

//*Eliminar una cuenta
accountRouter.delete('/:_id', (req, res) => {
  const {_id} = req.params
  const userIndex = USERS_BBDD.findIndex(user => user._id === _id)
  if(userIndex === -1) return res.status(404).send('No existe el usuario')
  USERS_BBDD.splice(userIndex, 1)
  res.send('Usuario eliminado')
})

export default accountRouter