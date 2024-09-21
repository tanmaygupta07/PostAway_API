import moment from "moment";
import UserModel from "../user/user.model.js";
import PostModel from "./post.model.js";
import { ApplicationError } from "../../errorHandler/applicationError.js";

export default class PostController {

    //get all the posts
    getAll = (req, res) => {
        const posts = PostModel.getAll();
        res.status(200).send({ posts: posts });
    }

    //get a post by it's id
    getByID = (req, res) => {
        const { id } = req.params;
        console.log(id);
        const post = PostModel.getByID(id);
        if (!post) {
            throw new ApplicationError("Post not found", 404)
        }

        return res.status(200).send({ post: post })
    }

    //get a post by user
    getByUser = (req, res) => {
        const { email, password } = req.body;

        const posts = PostModel.getByUser(email, password);

        if (!posts || posts.length === 0) {
            throw new ApplicationError("No Posts found!", 404);
        }
        return res.status(200).send({ posts: posts });
    }

    //add a new post
    addPost = (req, res) => {
        const { userID, caption, imageURL } = req.body;
        if (!userID || !caption || !imageURL) {
            throw new ApplicationError("Data Missing", 400);
        }

        const user = UserModel.get(userID);
        if (!user) {
            throw new ApplicationError("User not found!", 404);
        }

        const newPost = PostModel.addPost(userID, caption, imageURL);
        return res.status(201).send({ message: "Post created successfully!", post: newPost })
    }

    //delete an existing post
    delete = (req, res) => {
        const { postID } = req.params;
        const { userID } = req.body;

        if (!postID || !userID) {
            throw new ApplicationError("Data Missing", 400);
        }

        const deletedPost = PostModel.delete(postID, userID);
        if (!deletedPost) {
            throw new ApplicationError("Post not found or user not authorized", 404);
        }

        return res.status(200).send({ message: "Post deleted successfully", post: deletedPost })
    }

    //update a existing post
    update = (req, res) => {
        const { id, userID, caption, imageURL } = req.body;

        if (!id || !userID || !caption || !imageURL) {
            throw new ApplicationError("Data Missing", 400);
        }

        const postObj = { id, userID, caption, imageURL, timestamp: moment().format("DD MMM YYYY hh:mm A") }

        const updatedPost = PostModel.update(postObj);
        if (!updatedPost) {
            throw new ApplicationError("Post not found or user unauthorized to update the post", 404);
        }

        return res.status(200).send({ message: "Post updated successfully", updatedPost: updatedPost })
    }
}