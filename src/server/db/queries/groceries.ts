import { client } from "../connection";
import { GroceryItem } from "../../types";

const groceries = client.db().collection<GroceryItem>("groceries");

const getAll = () => groceries.find({}).toArray();
const create = (newItem: GroceryItem) => groceries.insertOne(newItem);
const deleteOne = (_id: GroceryItem["_id"], user_id: GroceryItem["user_id"]) => groceries.deleteOne({ _id, user_id });
const updateOne = (_id: GroceryItem["_id"], user_id: GroceryItem["user_id"], name: string) => groceries.updateOne({ _id, user_id }, { $set: { name } });

const admin = {
    deleteOne: (_id: GroceryItem["_id"]) => groceries.deleteOne({ _id }),
    updateOne: (_id: GroceryItem["_id"], name: string) => groceries.updateOne({ _id }, { $set: { name } }),
};

export default {
    getAll,
    create,
    deleteOne,
    updateOne,
    admin,
};
