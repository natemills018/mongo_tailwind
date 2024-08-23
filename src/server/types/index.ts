import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
}

export interface GroceryItem {
    _id?: ObjectId;
    name: string;
    user_id: User["_id"];
}

export interface Payload {
    id: User["_id"];
    email: User["email"];
    role: User["role"];
}

declare global {
    namespace Express {
        interface Request {
            user: Payload;
        }
    }
}
