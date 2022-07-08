import { USERS_BBDD } from "../bbdd.js";

const authFunction = (email, password) => {
  const user = USERS_BBDD.find(user => user.email === email);
  //401 --> Unauthorized
  if (!user) throw new Error('Unauthorized');
  if (user.password !== password) throw new Error('Unauthorized');

  return user;
}

export default authFunction;