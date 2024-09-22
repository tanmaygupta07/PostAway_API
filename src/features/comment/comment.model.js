import moment from "moment";

export default class CommentModel {
    constructor(id, userID, postID, content) {
        this.id = id;
        this.userID = userID;
        this.postID = postID;
        this.content = content;
        this.timestamp = moment().format("DD MMM YYYY hh:mm A");
    }

    //get all comments for a specific post
    static getAll(postID) {
        const comment = comments.filter(c => c.postID === parseInt(postID));
        return comment;
    }

    //add new comments to a specific post
    static add(userID, postID, content) {
        const newComment = new CommentModel(comments.length + 1, userID, parseInt(postID), content);

        comments.push(newComment);
        return newComment;
    }

    //delete a specific post by id
    static delete(commentID, userID) {
        const commentIndex = comments.findIndex(c => c.id === parseInt(commentID) && c.userID === userID);

        if (commentIndex === -1) {
            return null;
        }

        const comment = comments[commentIndex];
        comments.splice(commentIndex, 1);
        return comment;
    }

    //update a comment
    static update(commentID, userID, content) {
        const commentIndex = comments.findIndex(c => c.id === parseInt(commentID) && c.userID === userID);

        if (commentIndex === -1) {
            return null;
        }

        comments[commentIndex].content = content;
        comments[commentIndex].timestamp = moment().format("DD MMM YYYY hh:mm A");
        return comments[commentIndex];
    }

}


//pre-defined comments
let comments = [
    {
        id: 1,
        userID: 1,
        postID: 1,
        content: "Nice Post",
        timestamp: "30 Aug 2024 08:20 PM"
    },
    {
        id: 2,
        userID: 2,
        postID: 1,
        content: "Looking Good",
        timestamp: "31 Aug 2024 08:20 PM"
    },
    {
        id: 3,
        userID: 1,
        postID: 2,
        content: "Nice Job",
        timestamp: "30 Aug 2024 08:20 PM"
    }
]