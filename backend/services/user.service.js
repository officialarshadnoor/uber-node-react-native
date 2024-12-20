import userModel from "../models/user.model.js";

const userService = {
    async createUser({ firstname, lastname, email, password }) {
        if (!firstname || !email || !password) {
            throw new Error("All fields are required");
        }

        const user = await userModel.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
        });

        return user;
    },
};

export default userService;