import { ApplicationError } from "../../errorHandler/applicationError.js";

export default class UserModel {

    constructor(name, email, password, id) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    //Adding a user(signup)
    static signup(name, email, password) {
        const newUser = new UserModel(name, email, password, users.length + 1);
        users.push(newUser);
        return newUser;
    }

    //Confirming user login(signin)
    static signin(email, password) {
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new ApplicationError("User not found", 404);
        }

        return user;
    }

    //Getting all the users
    static getAll() {
        return users;
    }

    //get a user using id
    static get(userID) {
        const user = users.find(u => u.id === parseInt(userID));
        return user;
    }
}

//Pre defined users
let users = [
    {
        id: 1,
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "johndoe@123"
    },
    {
        id: 2,
        name: "Steve Smith",
        email: "steve@gmail.com",
        password: "steve@987"
    }
]