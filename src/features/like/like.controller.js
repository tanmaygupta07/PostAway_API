import { ApplicationError } from "../../errorHandler/applicationError.js";
import PostModel from "../post/post.model.js";
import UserModel from "../user/user.model.js";
import LikeModel from "./like.model.js";

export default class LikeController {

    //get all the likes of a specific post
    getAll = (req, res) => {
        const { postID } = req.params;

        const postExists = PostModel.getByID(postID);
        if (!postExists) {
            throw new ApplicationError("Post not found for this ID", 404);
        }

        const like = LikeModel.getAll(postID);
        if (like.length <= 0) {
            throw new ApplicationError("No likes found for this Post", 404);
        }

        return res.status(200).send({ likes: like })
    }

    //toggle the like status of a post
    toggle = (req, res) => {
        const { postID } = req.params;
        const userID = req.userID;

        const postExists = PostModel.getByID(postID);
        if (!postExists) {
            throw new ApplicationError("Post not found for this ID", 404);
        }

        const userExists = UserModel.get(userID);
        if (!userExists) {
            throw new ApplicationError("User Not Found", 404);
        }

        const isLiked = LikeModel.findByUserAndPost(userID, postID);
        if (isLiked) {
            const removeLike = LikeModel.remove(userID, postID);
            return res.status(200).send({ message: "Succesfully removed like", removedLike: removeLike });
        }
        else {
            const addLike = LikeModel.add(userID, postID);
            if (addLike.error) {
                throw new ApplicationError(addLike.error, 400);
            }

            return res.status(200).send({ message: "Successfully added like", addedLike: addLike })
        }
    }
}