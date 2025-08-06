const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline:{
        type: Date,
        required: true
    },
    ProjectManager:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    task:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

module.exports = mongoose.model('Project', ProjectSchema);