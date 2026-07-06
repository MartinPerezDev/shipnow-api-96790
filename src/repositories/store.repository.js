import StoreModel from "../models/store.model.js";

export const insertManyStores = async (stores) => {

    return await StoreModel.insertMany(stores);

};