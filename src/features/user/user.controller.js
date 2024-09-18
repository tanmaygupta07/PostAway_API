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
            return res.status(400).send({ error: "Incorrect Credentials" });
        }
        else {
            return res.status(200).send({ message: "Logged In Successfully", userData: user })
        }
    }

    getAll = (req, res) => {
        const users = UserModel.getAll();
        return res.status(200).send({ userData: users });
    }

    get = (req, res) => {
        const { userID } = req.params;
        const user = UserModel.get(userID);

        if (!user) {
            return res.status(404).send({ message: "User Not Found!" })
        }

        return res.status(200).send({ userData: user });
    }
}