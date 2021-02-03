'use strict';

import {
  decode
} from 'jwt-simple';
import moment from 'moment';
import jwt from "../config/jwt";

const UserAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: 'La peticion no tiene la cabecera de autenticacion'
    });
  }
  var token = req.headers.authorization.replace(/['"]+/g, '');
  try {
    var payload = decode(token, jwt.secret);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: 'El token a expirado'
      });
    }
  } catch (ex) {
    console.log(ex);
    return res.status(404).send({
      message: 'token no valido'
    });
  }
  req.user = payload;

  next();
};

export default {
  UserAuth
};