import UserModel from "../user/user.model";

export default class PostModel {
    constructor(id, userID, caption, imageURL) {
        this.id = id;
        this.userID = userID;
        this.caption = caption;
        this.imageURL = imageURL;
        this.timestamp = new Date().toLocaleString();;
    }

    //retreive all the posts
    static getAll() {
        return posts;
    }

    //retrieve a post by it's id
    static getByID(id) {
        const post = posts.find(p => p.id === parseInt(id));
        return post;
    }

    //retrieve posts by user credentials
    static getByUser(email, password) {
        try {
            const user = UserModel.signin(email, password);
            const post = posts.filter(p => p.userID === user.id);
            return post;
        } catch (error) {
            console.error(error.message)
        }
    }

    // add a new post
    static addPost(userID, caption, imageURL) {
        const newPost = new PostModel(posts.length + 1, userID, caption, imageURL);
        posts.push(newPost);
        return newPost;
    }

    //delete a post
    static delete(postID, userID) {
        const postIndex = posts.findIndex(p => p.id === parseInt(postID) && p.userID === parseInt(userID));

        if (postIndex === -1) {
            return null;
        }
        else {
            const post = posts[postIndex];
            posts.splice(postIndex, 1);
            return post;
        }
    }

    static update(postObj) {
        const index = posts.findIndex(p => p.id === postObj.id && p.userID === postObj.userID);

        if (index === -1) {
            return null;
        }
        else {
            posts[index] = postObj;
            return posts[index];
        }
    }
}

let posts = [
    {
        id: 1,
        userID: 1,
        caption: "Summary of the book Atomic Habits",
        imageURL: "https://5.imimg.com/data5/SELLER/Default/2022/10/GB/ES/KH/162021231/atomic-habits-business-book.jpg",
        timestamp: "30 Aug 2024 08:15 PM"
    },
    {
        id: 2,
        userID: 2,
        caption: "Impact of AI on Healthcare System",
        imageURL: "https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/og-ai-in-healthcare.png",
        timestamp: "30 Aug 2024 08:15 PM"
    }
]