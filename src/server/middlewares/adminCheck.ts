import { RequestHandler } from "express";
import tokens from "../utilities/tokens";

const adminCheck: RequestHandler = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Missing auth headers" });
    }

    const [type, token] = req.headers.authorization.split(" ");

    if (!type || type.toLowerCase() !== "bearer") {
        return res.status(401).json({ message: "Incorrect auth header type" });
    }

    try {
        const payload = tokens.verify(token);

        if (payload.role !== "admin") {
            return res.status(403).json({ message: "Sorry chump, gotta be an admin to access this resource" });
        }

        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token, please try logging in again" });
    }
};

export default adminCheck;
