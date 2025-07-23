const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
    },
    dueDate:{
        type: Date,
        required: true,
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    status:{
        type:String,
        enum:['todo', 'in-progress', 'done'],
        default: 'todo',
    },
    priority:{
        type:String,
        enum:['low', 'medium', 'high'],
        default: 'medium',
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    projectName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);