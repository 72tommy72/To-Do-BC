// 1)user
import { UserModel } from "../../../DB/models/user.model.js";
import { catchError } from "../../utlis/catchError.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// 1-signUp
export const signUp = catchError(async (req, res, next) => {
    //data
    const { firstName, lastName, email, password, age, gender, phone } = req.body;
    //check user is existence
    const isUser = await UserModel.findOne({ email });
    if (isUser) {
        return next(new Error("Email already exist!"));
    }
    //hashed password
    const hashedPassword = bcryptjs.hashSync(
        password,
        Number(process.env.SALT_ROUNDS)
    );
    //create user
    const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        age,
        gender,
        phone,
    });
    //send response
    return res.status(400).json({
        success: true,
        message: "Can you login now",
    });
});
// 2-login-->with create token
export const login = catchError(async (req, res, next) => {
    //data
    const { email, password } = req.body;
    //check user is existence
    const user = await UserModel.findOne({ email });
    if (!user) {
        return next(new Error("Email Not Exist!"));
    }
    //check password
    const match = bcryptjs.compareSync(password, user.password);
    if (!match) {
        return next(new Error("Password Not Incorrect!"));
    }
    //token
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.SECRET_KEY
    );
    //response
    return res.status(200).json({
        success: true,
        token,
    });
});
// 3-change password (user must be logged in)
export const changePassword = catchError(async (req, res, next) => {
    //data
    const { password } = req.body;
    //updatePassword
    const user = await UserModel.findOneAndUpdate(
        { email: req.user.email },
        { password }
    );
    return res.json({
        success: true,
        message : "password changed successfully"
    })
});
// 4-update user (age , firstName , lastName)(user must be logged in)
export const updateUser = catchError(async (req, res, next) => {
    //updateData
    // const user = await UserModel.findOneAndUpdate(
    //     { email: req.user.email },
    //     { age , firstName , lastName }
    // );
    const user = await UserModel.findOne({ email: req.user.email })
    user.age = req.body.age ? req.body.age : req.age
    user.firstName = req.body.firstName ? req.body.firstName : req.firstName
    user.lastName = req.body.lastName ? req.body.lastName : req.lastName
    await user.save()
    return res.json({
        success: true,
        message : "age & firstName & lastName updated successfully"
    })
});
// 5-delete user(user must be logged in)
export const deleteUser = catchError(async (req, res, next) => {
    //updatePassword
    const user = await UserModel.findOneAndDelete(
        { email: req.user.email }
    );
    return res.json({
        success: true,
        message : "user deleted successfully"
    })
});
// 6-logout
export const logout = catchError(async (req, res, next) => {
    
    return res.json({
        success: true,
        message : "user logout successfully"
    })
});