import jwt from "jsonwebtoken";
import config from "../config";
import { Payload } from "../types";

const sign = (payload: Payload) => jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiration });

const verify = (token: string) => jwt.verify(token, config.jwt.secret) as Payload;

export default {
    sign,
    verify,
};
