import UserModel from "../models/User.model.js";
import { isPasswordValid, hashPassword } from "../utils/PasswordHasher.js";


export const userSignUp = async (req, res, next) => {
    try {

        const { fullName, email, password, mobile } = req.body;
console.log("controller signup", req.body);
        const isUserAvailable = await UserModel.findOne({ email: email });

        if (!isUserAvailable) {
            const hashedPassword = await hashPassword(password)
            const newUser = await UserModel.create({ fullName, email, mobile, password: hashedPassword });

            return res.status(201).json({
                success: true, message: `Signup Successful !`, data: {
                    fullName: newUser.fullName, email: newUser.email,
                    uid: newUser._id, mobile: newUser.mobile
                }
            });
        }


        return res.status(404).json({ error: true, message: `User with email ${email} already exists` });


    } catch (error) {
        next(error);
    }
}


export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const isUserAvailable = await UserModel.findOne({ email: email });

        if (!isUserAvailable) {
            return res.status(404).json({ error: true, message: `No User found with email ${email}` })
        }
        const isPasswordCorrect = await isPasswordValid(password, isUserAvailable.password);
        if (!isPasswordCorrect) {
          return  res.status(404).json({ error: true, message: `Invalid Credentials` })
        }

        res.status(200).json({error : false,message :`Login Successful`, data : {
            uid : isUserAvailable._id,
            fullName : isUserAvailable.fullName, 
            email : isUserAvailable.email , 
            // token : createToken(isUserAvailable._id),
            mobile : isUserAvailable.mobile,
            
        } })

    } catch (error) {
        next(error);
    }
}

