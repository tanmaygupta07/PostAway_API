import { ApplicationError } from "../../errorHandler/applicationError.js";
import UserModel from "../user/user.model.js";
import CommentModel from "./comment.model.js"

export default class CommentController {

    //get all the comments of a specific post
    getAll = (req, res) => {
        const { postID } = req.params;
        const comments = CommentModel.getAll(postID);

        if (comments.length <= 0) {
            throw new ApplicationError("No comments found for this post", 404);
        }

        return res.status(200).send({ comments: comments });
    }

    //add a comment to a specific post
    add = (req, res) => {
        const { userID, content } = req.body;
        const { postID } = req.params;

        if (!userID || !postID || !content) {
            throw new ApplicationError("Data Missing", 400);
        }

        const user = UserModel.get(userID);
        if (!user) {
            throw new ApplicationError("User not found!", 404);
        }

        const newComment = CommentModel.add(userID, postID, content);
        return res.status(200).send({ message: "Comment added successfully!", comment: newComment });
    }

    //delete a comment using its id
    delete = (req, res) => {
        const { commentID } = req.params;
        const { userID } = req.body;

        const deletedComment = CommentModel.delete(commentID, userID);
        if (deletedComment === null) {
            throw new ApplicationError("Comment not found!", 404);
        }

        return res.status(200).send({ message: "Comment deleted successfully", deletedComment: deletedComment })
    }

    // update a comment using its id
    update = (req, res) => {
        const { commentID } = req.params;
        const { userID, content } = req.body;

        const updatedComment = CommentModel.update(commentID, userID, content);

        if (updatedComment === null) {
            throw new ApplicationError("Comment not found!", 404);
        }

        return res.status(200).send({ message: "Comment updated succesfully", updatedComment })
    }

}