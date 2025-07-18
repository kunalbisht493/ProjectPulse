const Project = require('../Models/Project');
const User = require('../Models/User');
const Task = require('../Models/Task');

// CREATE A NEW PROJECT
exports.createProject = async (req, res) => {
    try{
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
    }catch(err){
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
    try{
        

    }catch(err){
        console.error("Error in getAllProjects:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}


