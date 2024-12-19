import { Schema, model } from "mongoose";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullname: {
        firstname: {
            type: String, 
            required: true, 
            minlength: [3, 'First name must be at least 3']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters']
        }
    },
email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, 'Email must be at least 5 characters']
},
password: {
    type: String,
    required: true,
    select: false
},
socketId: {
    type: String,
}

})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await hash(password, 10);
}

const userModel = model("User", userSchema);

export default userModel;