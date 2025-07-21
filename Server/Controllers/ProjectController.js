const Project = require('../Models/Project');
const User = require('../Models/User');
const Task = require('../Models/Task');

// CREATE A NEW PROJECT
exports.createProject = async (req, res) => {
    try {
        // FETCHING DATA FROM THE REQUEST BODY
        const { title, description, deadline, ProjectManager, teamMembers, task } = req.body;

        // VALIDATING THE REQUEST BODY
        if (!title || !description || !deadline || !ProjectManager) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: title, description, deadline, ProjectManager"
            });
        }
        // CREATING A PROJECT AND SAVING IT TO THE DATABASE
        const newProject = await Project.create({
            title,
            description,
            deadline,
            ProjectManager,
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
exports.getAllProjects = async (req, res) => {
    try {
        // FETCHING ALL PROJECTS FROM THE DATABASE
        const projects = await Project.find()
            .populate('ProjectManager', 'name email')
            .populate('teamMembers', 'name email')
            .populate('task');
        // SENDING SUCCESS RESPONSE
        return res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            projects: projects
        });

    } catch (err) {
        console.error("Error in getAllProjects:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}


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
        const update = req.body;

        // VALIDATING THE PROJECT ID
        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required"
            });
        }

        // UPDATING THE PROJECT IN THE DATABASE
        const updatedProject = await Project.findByIdAndUpdate(projectId, update, { new: true, runValidators: true })
            .populate('ProjectManager', 'name email')
            .populate('teamMembers', 'name email')
            .populate('task');

        // SENDING SUCCESS RESPONSE 
        if (!updatedProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

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

        // SENDING SUCCESS RESPONSE  
        return res.status(200).json({
            success: true,
            message: "Project deleted successfully"
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
