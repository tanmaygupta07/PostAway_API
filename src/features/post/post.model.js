import UserModel from "../user/user.model.js";
import momemt from 'moment';

export default class PostModel {
    constructor(id, userID, caption, image) {
        this.id = id;
        this.userID = userID;
        this.caption = caption;
        this.image = image;
        this.timestamp = momemt().format("DD MMM YYYY hh:mm A");
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

    //retrieve posts by user id
    static getByUser(userID) {
        const userPosts = posts.filter(p => p.userID === parseInt(userID));
        return userPosts;
    }

    // add a new post
    static addPost(userID, caption, image) {
        const newPost = new PostModel(posts.length + 1, userID, caption, image);
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

    //update a post
    static update(postObj) {
        const index = posts.findIndex(p => p.id === parseInt(postObj.id) && p.userID === parseInt(postObj.userID));

        if (index === -1) {
            return null;
        }
        else {
            posts[index] = postObj;
            return posts[index];
        }
    }

    //filter posts based on caption
    static filterByCaption(caption) {
        return posts.filter(p => p.caption.toLowerCase().includes(caption.toLowerCase()));
    }
}

//pre-defined posts
let posts = [
    {
        id: 1,
        userID: 1,
        caption: "Summary of the book Atomic Habits",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/10/GB/ES/KH/162021231/atomic-habits-business-book.jpg",
        timestamp: "30 Aug 2024 08:15 PM"
    },
    {
        id: 2,
        userID: 2,
        caption: "Impact of AI on Healthcare System",
        image: "https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/og-ai-in-healthcare.png",
        timestamp: "30 Aug 2024 08:15 PM"
    }
]