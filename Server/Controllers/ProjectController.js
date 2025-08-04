const mongoose = require('mongoose');
const Project = require('../Models/ProjectSchema');
const User = require('../Models/UserSchema');
const Task = require('../Models/TaskSchema');

// CREATE A NEW PROJECT
exports.createProject = async (req, res) => {
    try {
        // FETCHING DATA FROM THE REQUEST BODY
        const { name, description, deadline, ProjectManager, teamMembers, task } = req.body;

        // FETCHING PROJECT MANAGER FROM THE DATABASE
        const projectManager = await User.findOne({ name: ProjectManager });
        if (!projectManager) {
            return res.status(404).json({
                success: false,
                message: "Project Manager not found"
            })
        }

        // VALIDATING THE REQUEST BODY
        if (!name || !description || !deadline || !ProjectManager) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }
        // CREATING A PROJECT AND SAVING IT TO THE DATABASE
        const newProject = await Project.create({
            name,
            description,
            deadline,
            ProjectManager: projectManager._id,
            teamMembers: teamMembers || [],
            task: task || []
        })
        // SENDING SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            message: "Project created successfully",
            project: newProject
        })
    } catch (err) {
        console.error("Error in createProject:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}


// GET ALL PROJECTS
exports.getProjects = async (req, res) => {
    try {
        // Ensure ObjectId comparison works
        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Base query: only non-deleted projects
        let query = { isDeleted: { $ne: true } };

        if (req.user.role !== 'admin') {
            // Filter for non-admins to only show relevant projects
            query.$or = [
                { ProjectManager: userId },
                { teamMembers: userId }
            ];
        }

        const projects = await Project.find(query)
            .populate('ProjectManager', 'name email')
            .populate('teamMembers', 'name email');

        return res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            projects
        });

    } catch (err) {
        console.error("Error in getProjects:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
};







// GET PROJECT BY ID
exports.getProjectById = async (req, res) => {
    try {
        // FETCHING PROJECT ID FROM THE REQUEST PARAMETERS
        const projectId = req.params.id;
        // VALIDATING THE PROJECT ID
        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required"
            });
        }
        // FETCHING THE PROJECT FROM THE DATABASE
        const project = await Project.findById(projectId)
            .populate('ProjectManager', 'name email')
            .populate('teamMembers', 'name email')
            .populate('task');

        // SENDING SUCCESS RESPONSE 
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Project fetched successfully",
            project: project
        });

    } catch (err) {
        console.error("Error in getProjectById:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

// UPDATING THE PROJECT
exports.updateProject = async (req, res) => {
    try {
        //FETCHING PROJECT ID FROM THE REQUEST PARAMETERS
        const projectId = req.params.id;

        //FETCHING DATA FROM THE REQUEST BODY
        const { title, description, deadline, ProjectManager, teamMembers, task } = req.body;
        const user = await User.findOne({ name: ProjectManager });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Project Manager not found"
            });
        }

        // VALIDATING THE PROJECT ID
        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required"
            });
        }


        // UPDATING THE PROJECT IN THE DATABASE
        const updatedProject = await Project.findByIdAndUpdate(
            projectId, { title, description, deadline, ProjectManager: user._id, teamMembers, task }, { new: true, runValidators: true })
            .populate('ProjectManager', 'name email')
            .populate('teamMembers', 'name email')
            .populate('task');

        if (!updatedProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }
        // SENDING SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project: updatedProject
        });

    } catch (err) {
        console.error("Error in updateProject:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

// SOFT DELETE PROJECT
exports.softDeleteProject = async (req, res) => {
    try {
        // FETCHING PROJECT ID FROM THE REQUEST PARAMETERS
        const projectId = req.params.id;

        // VALIDATING THE PROJECT ID
        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required"
            });
        }

        // SOFT DELETING THE PROJECT BY UPDATING THE IS_DELETED FIELD
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            { isDeleted: true },
            { new: true, runValidators: true }
        ).populate('ProjectManager', 'name email')
            .populate('teamMembers', 'name email')
            .populate('task');

        // DELETING TASKS ASSOCIATED WITH THE PROJECT
        await Task.updateMany(projectId, { isDeleted: true, });

        // SENDING SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            message: "Project soft deleted successfully",
            project: updatedProject
        });
    } catch (err) {
        console.error("Error in softDeleteProject:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}


// RESTORING SOFT DELETED PROJECT
exports.restoreProject = async (req, res) => {
    try {
        // FETCHING PROJECT ID FROM THE REQUEST PARAMETERS
        const projectId = req.params.id;

        // VALIDATING THE PROJECT ID
        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required"
            });
        }

        // RESTORING THE SOFT DELETED PROJECT BY UPDATING THE IS_DELETED FIELD
        const restoredProject = await Project.findByIdAndUpdate(
            projectId,
            { isDeleted: false },
            { new: true, runValidators: true }
        ).populate('ProjectManager', 'name email')
            .populate('teamMembers', 'name email')
            .populate('task');

        // RESTORING TASKS ASSOCIATED WITH THE PROJECT
        await Task.updateMany({ project: projectId }, { isDeleted: false });

        // SENDING SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            message: "Project restored successfully",
            project: restoredProject
        });

    } catch (err) {
        console.error("Error in restoreProject:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

// DELETE PROJECT
exports.deleteProject = async (req, res) => {
    try {
        // FETCHING PROJECT ID FROM THE REQUEST PARAMETERS
        const projectId = req.params.id;

        // VALIDATING THE PROJECT ID
        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required"
            });
        }

        // DELETING THE PROJECT FROM THE DATABASE
        const deletedProject = await Project.findByIdAndDelete(projectId);

        // DELETING TASKS ASSOCIATED WITH THE PROJECT
        const deletedTask = await Task.deleteMany({ project: new mongoose.Types.ObjectId(projectId) });
        // console.log("Deleted Task:", deletedTask.deletedCount);

        // SENDING SUCCESS RESPONSE  
        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            deletedProject: deletedProject
        });

    } catch (err) {
        console.error("Error in deleteProject:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}
