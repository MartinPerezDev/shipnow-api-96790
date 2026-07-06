import UserModel from "../models/user.model.js";


export const insertManyUsers = async (users) => {

    return await UserModel.insertMany(users);

}

