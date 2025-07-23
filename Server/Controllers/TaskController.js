const Task = require('../Models/TaskSchema');
const Project = require('../Models/ProjectSchema');
const User = require('../Models/UserSchema');

// CREATING A NEW TASK
exports.createTask = async (req, res) => {
    try {
        // FETCHING DATA FROM THE REQUEST BODY
        const { description, dueDate, assignedTo, projectName, priority } = req.body;

        // FETCHING USER FROM THE DATABASE
        const user = await User.findOne({name:assignedTo});
        console.log("Assigned User:", user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        // FETCHING PROJECT FROM THE DATABASE
        const project = await Project.findOne({title: projectName});
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            })
        }
        // VALIDATING THE REQUEST BODY
        if (!description || !dueDate || !assignedTo) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }
        // CREATING A TASK AND SAVING IT TO THE DATABASE
        const newTask = await Task.create({
            description,
            dueDate,
            assignedTo: user._id,
            priority: priority || 'medium',
            projectName: project._id
        })

        // ADDING THE TASK TO THE PROJECT TASKS ARRAY
        await Project.findByIdAndUpdate(
            project, { $push: { task: newTask._id } }, { new: true }).populate('task').exec();

        // SENDING SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            message: "Task created successfully",
            task: newTask
        })

    } catch (err) {
        console.error("Error in createTask:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

// UPDATE PRIORITY OF A TASK
exports.updateTaskPriority = async (req, res) => {
    try {
        // FETCHING TASK ID AND NEW PRIORITY FROM THE REQUEST BODY
        const { id } = req.params;
        const { priority } = req.body;

        // UPDATING THE TASK PRIORITY AND SAVING IT TO THE DATABASE
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { priority },
            { new: true }
        );

        // SENDING SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            message: "Task priority updated successfully",
            task: updatedTask
        });

    } catch (error) {
        console.error("Error in updateTaskPriority:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }

}


// UPDATE A TASK STATUS
exports.updateTaskStatus = async (req, res) => {
    try {
        // FETCHING TASK ID AND NEW STATUS FROM THE REQUEST BODY
        const { id } = req.params;
        const { status } = req.body;

        // UPDATING THE TASK STATUS AND SAVING IT TO THE DATABASE
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { status },
            { new: true })

        // SENDING SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            task: updatedTask
        })

    } catch (error) {
        console.error("Error in updateTaskStatus:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


// DELETE A TASK
exports.deleteTask = async (req, res) => {
    try {
        // FETCHING TASK ID FROM THE REQUEST PARAMETERS
        const taskId = req.params.id;

        // FINDING AND DELETING THE TASK    
        const task = await Task.findByIdAndDelete(taskId);

        // SENDING SUCCESS RESPONSE
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            task: task
        });

    } catch (err) {
        console.error("Error in deleteTask:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }

}