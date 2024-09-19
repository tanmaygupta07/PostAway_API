import UserModel from "../user/user.model";
import PostModel from "./post.model";

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
            return res.status(404).send({ message: "Post not found" });
        }
    }

    //get a post by user
    getByUser = (req, res) => {
        const { email, password } = req.body;
        const posts = PostModel.getByUser(email, password);

        if (posts.length === 0) {
            return res.status(404).send({ message: "No Posts found!" })
        }
        return res.status(200).send({ posts: posts });
    }

    //add a new post
    addPost = (req, res) => {
        const { userID, caption, imageURL } = req.body;

        if (!userID || !caption || !imageURL) {
            return res.status(400).send({ message: "Please provide all the required fields: userID, caption and imageURL" });
        }

        const user = UserModel.get(userID);

        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        const newPost = PostModel.addPost(userID, caption, imageURL);

        return res.status(201).send({ message: "Post created successfully!", post: newPost })
    }

    //delete an existing post
    delete = (req, res) => {
        const { postID } = req.params;
        const { userID } = req.body;

        if (!postID || !userID) {
            return res.send(400).send({ message: "Please Provide both userID and postID" });
        }

        const deletedPost = PostModel.delete(postID, userID);

        if (!deletedPost) {
            return res.status(404).send({ message: "Post not found or user not authorized" });
        }

        return res.status(200).send({ message: "Post deleted successfully", post: deletedPost })
    }

    //update a existing post
    update = (req, res) => {
        const { id, userID, caption, imageURL } = req.body;

        if (!id || !userID || !caption || !imageURL) {
            return res.status(400).send({ message: "Data missing" });
        }

        const postObj = { id, userID, caption, imageURL }

        const updatedPost = PostModel.update(postObj);

        if (!updatedPost) {
            return res.status(404).send({ message: "Post not found or user unauthorized to update the post" });
        }

        return res.status(200).send({ message: "Post updated successfully", updatedPost: updatedPost })
    }
}