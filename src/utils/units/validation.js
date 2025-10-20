import {emailReg} from '../regex';

export const validateEmail = email => {
  return emailReg.test(email);
};
