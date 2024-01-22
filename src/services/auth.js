import {removeWindowClass} from '@app/utils/helpers';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '@app/Conexion/credenciales';

const auth = getAuth(app);
export const loginByAuth = async (email, password) => {
  const token = 'I_AM_THE_TOKEN';
  localStorage.setItem('token', token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return token;
};

export const authLoginl = (email, password) => {
  return new Promise(async (res, rej) => {
    // await sleep(500);
     await signInWithEmailAndPassword(auth, email, password)
     .then((user) => {
      localStorage.setItem(
        'authentication',
        JSON.stringify({ profile: { email: user.user.email } })
      );
      return res({ profile: { email: user.user.email } });
     }).catch((error) => {
      console.log(error);
      return rej({ message: 'Correo o Contraseña incorrecto' });
     })

      
    
    
  });
};

export const registerByAuth = async (email, password) => {
  const token = 'I_AM_THE_TOKEN';
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};
