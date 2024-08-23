import { client } from "../connection";
import { User } from "../../types";

const users = client.db().collection<User>("users");

const create = (newUser: User) => users.insertOne(newUser);
const find = (email: string) => users.findOne({ email });

export default {
    create,
    find,
};
