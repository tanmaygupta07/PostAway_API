import jwt from 'jsonwebtoken';
import { ApplicationError } from "../../errorHandler/applicationError.js";
import UserModel from "./user.model.js";

export default class UserController {

    //Signup
    signup = (req, res) => {
        const { name, email, password } = req.body;
        const user = UserModel.signup(name, email, password);
        res.status(201).send({ message: 'Account Created Successfully', userData: user });
    }

    //Signin
    signin = (req, res) => {
        const { email, password } = req.body
        const user = UserModel.signin(email, password);

        if (!user) {
            throw new ApplicationError("Incorrect credentials", 400);
        }
        else {
            const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
            return res.status(200).send(token)
        }
    }

    getAll = (req, res) => {
        const users = UserModel.getAll();
        return res.status(200).send({ userData: users });
    }

    get = (req, res) => {
        const  userID  = req.userID;
        const user = UserModel.get(userID);

        if (!user) {
            throw new ApplicationError("User not found!", 404);
        }

        return res.status(200).send({ userData: user });
    }
}