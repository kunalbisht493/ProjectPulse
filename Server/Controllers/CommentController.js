const Comment = require('../Models/CommentSchema');
const Task = require('../Models/TaskSchema');

// CREATE A NEW COMMENT
exports.createComment = async (req, res) => {
    try{
        // FETCHING DATA FROM THE REQUEST BODY
        const { Title, createdBy, mentions } = req.body;

        // VALIDATING THE REQUEST BODY
        if (!Title) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }   

        // CREATING A COMMENT AND SAVING IT TO THE DATABASE
        const newComment = await Comment.create({
            Title,
            createdBy,
            mentions: mentions || []
        });

        // ADDING THE COMMENT TO THE TASK COMMENTS ARRAY
        await Task.findByIdAndUpdate(createdBy, { $push: { comments: newComment._id } }, { new: true })
        .populate('Comments').exec()

        // SENDING SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            message: "Comment created successfully",
            comment: newComment
        });

    }catch (err) {
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
    try{
        // FETCHING COMMENT ID FROM THE REQUEST PARAMETERS
        const { id } = req.params;

        // FINDING AND DELETING THE COMMENT
        const deletedComment = await Comment.findByIdAndDelete(id);

        // SENDING SUCCESS RESPONSE
        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
            comment: deletedComment
        });
    }catch (err) {
        console.error("Error in deleteComment:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}