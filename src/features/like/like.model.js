let currentID = 3;

export default class LikeModel {
    constructor(id, userID, postID) {
        this.id = id;
        this.userID = userID;
        this.postID = postID;
    }

    //get all the likes for a specific post
    static getAll(postID) {
        const like = likes.filter(l => l.postID === parseInt(postID));
        return like;
    }

    //find a like by userID and postID
    static findByUserAndPost(userID, postID) {
        return likes.find(l => l.userID === userID && l.postID === parseInt(postID));
    }

    //add a like to a post
    static add(userID, postID) {
        const existingLike = this.findByUserAndPost(userID, parseInt(postID));

        if (existingLike) {
            return { error: "Like already exists" };
        }

        currentID += 1;
        const newLike = new LikeModel(currentID, userID, parseInt(postID));
        likes.push(newLike);
        return newLike;
    }

    //remove a like of a specific post
    static remove(userID, postID) {
        const likeIndex = likes.findIndex(l => l.userID === userID && l.postID === parseInt(postID));

        if (likeIndex === -1) {
            return null;
        }

        const removedLike = likes[likeIndex];
        likes.splice(likeIndex, 1);
        return removedLike;
    }
}


//Pre-defined likes
let likes = [
    {
        id: 1,
        userID: 1,
        postID: 1
    },
    {
        id: 2,
        userID: 2,
        postID: 2
    },
    {
        id: 3,
        userID: 2,
        postID: 1
    }
]