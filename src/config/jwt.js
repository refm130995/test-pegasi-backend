"use strict";

import {
  encode
} from "jwt-simple";
import moment from "moment";
const secret = "lentemal!$#F2020";

const createToken = (user) => {
  var payload = {
    sub: user._id,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment()
      .add(7, "days")
      .unix()
  };
  return encode(payload, secret);
}

export default {
  createToken,
  secret
}