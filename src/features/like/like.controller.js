import PostModel from "../post/post.model.js";
import UserModel from "../user/user.model.js";
import LikeModel from "./like.model.js";

export default class LikeController {

    //get all the likes of a specific post
    getAll = (req, res) => {
        const { postID } = req.params;

        const postExists = PostModel.getByID(postID);
        if (!postExists) {
            return res.status(404).send({ message: "Post not found for this ID" })
        }

        const like = LikeModel.getAll(postID);
        if (like.length <= 0) {
            return res.status(404).send({ message: "No likes found for this Post" })
        }

        return res.status(200).send({ likes: like })
    }

    //toggle the like status of a post
    toggle = (req, res) => {
        const { postID } = req.params;
        const { userID } = req.body;

        const postExists = PostModel.getByID(postID);
        if (!postExists) {
            return res.status(404).send({ message: "Post Not Found for this id" });
        }

        const userExists = UserModel.get(userID);
        if (!userExists) {
            return res.status(404).send({ message: "User not found" });
        }

        const isLiked = LikeModel.findByUserAndPost(userID, postID);
        if (isLiked) {
            const removeLike = LikeModel.remove(userID, postID);
            return res.status(200).send({ message: "Succesfully removed like", removedLike: removeLike });
        }
        else {
            const addLike = LikeModel.add(userID, postID);
            if (addLike.error) {
                return res.status(400).send({ message: addLike.error });
            }

            return res.status(200).send({ message: "Successfully added like", addedLike: addLike })
        }
    }
}