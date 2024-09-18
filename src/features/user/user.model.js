export default class UserModel {

    constructor(name, email, password, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id;
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
            throw new Error("User not found");
        }

        return user;
    }

    //Getting all the users
    static getAll() {
        return users;
    }

    //get a user using id
    static get(userID) {
        const user = users.find(u => u.id === userID);
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