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
        const post = PostModel.getByID(id);
        if (!post) {
            throw new ApplicationError("Post not found", 404)
        }

        return res.status(200).send({ post: post })
    }

    //get a post by user
    getByUser = (req, res) => {
        const userID = req.userID;

        const posts = PostModel.getByUser(userID);

        if (!posts || posts.length === 0) {
            throw new ApplicationError("No posts found for this user!", 404);
        }

        return res.status(200).send({ posts });
    }

    //add a new post
    addPost = (req, res) => {
        const { caption } = req.body;
        const image = req.file;
        const userID = req.userID;

        if (!caption || !image) {
            throw new ApplicationError("Data Missing", 400);
        }

        const imageName = image.filename;
        const newPost = PostModel.addPost(userID, caption, imageName);
        return res.status(201).send({ message: "Post created successfully!", post: newPost })
    }

    //delete an existing post
    delete = (req, res) => {
        const { postID } = req.params;
        const userID = req.userID;

        if (!postID) {
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
        const { id } = req.params;
        const { caption } = req.body;
        const image = req.file;
        const userID = req.userID;

        if (!id || !caption || !image) {
            throw new ApplicationError("Data Missing", 400);
        }

        const imageName = image.filename;
        const postObj = { id: parseInt(id), userID, caption, imageName, timestamp: moment().format("DD MMM YYYY hh:mm A") };

        const updatedPost = PostModel.update(postObj);
        if (!updatedPost) {
            throw new ApplicationError("Post not found or user unauthorized to update the post", 404);
        }

        return res.status(200).send({ message: "Post updated successfully", updatedPost: updatedPost })
    }
}