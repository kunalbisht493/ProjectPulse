const Comment = require('../Models/CommentSchema');
const Task = require('../Models/TaskSchema');
const User = require('../Models/UserSchema');

// CREATE A NEW COMMENT
exports.createComment = async (req, res) => {
    try {
        // FETCHING TASK ID FROM THE REQUEST PARAMETERS
        const taskId = req.params.id;

        // FETCHING DATA FROM THE REQUEST BODY
        const { content, createdBy, mentions } = req.body;

        // FETCHING USER ID FROM THE REQUEST
        const creator = await User.findOne({ name: createdBy });
        if (!creator) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let mentionIds = [];

        if (Array.isArray(mentions)) {
            for (const name of mentions) {
                const user = await User.findOne({ name });
                if (user) {
                    mentionIds.push(user._id);
                } else {
                    console.warn(`Mentioned user not found: ${name}`);
                }
            }
        }


        // VALIDATING THE REQUEST BODY
        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // CREATING A COMMENT AND SAVING IT TO THE DATABASE
        const newComment = await Comment.create({
            content,
            taskId,
            createdBy: creator._id,
            mentions: mentionIds || []
        });

        // ADDING THE COMMENT TO THE TASK COMMENTS ARRAY
        await Task.findByIdAndUpdate(taskId, { $push: { comments: newComment._id } }, { new: true })
            .populate('comments').exec()

        // SENDING SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            message: "Comment created successfully",
            comment: newComment
        });

    } catch (err) {
        console.error("Error in createComment:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

// DELETE A COMMENT
exports.deleteComment = async (req, res) => {
    try {
        // FETCHING COMMENT ID FROM THE REQUEST PARAMETERS
        const { id } = req.params;


        // FINDING AND DELETING THE COMMENT
        const deletedComment = await Comment.findByIdAndDelete(id);

        const taskId = deletedComment.taskId;
        await Task.findByIdAndUpdate(taskId, { $pull: { comments: id } }, { new: true });

        // SENDING SUCCESS RESPONSE
        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
            comment: deletedComment
        });
    } catch (err) {
        console.error("Error in deleteComment:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}