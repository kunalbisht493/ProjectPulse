const express = require('express');
const router = express.Router();

const {signup,login} = require('../Controllers/AuthController');
const {createProject, getAllProjects, getProjectById, updateProject, deleteProject} = require('../Controllers/ProjectController');
const {createTask, deleteTask} = require('../Controllers/TaskController');
const {createComment, deleteComment} = require('../Controllers/CommentController'); 
const {auth} = require('../Middlewares/Auth');

// SIGNUP AND LOGIN ROUTES
router.post('/signup', signup);
router.post('/login', login);

// PROJECT ROUTES
router.post('/project/createproject', createProject);
router.get('/dashboard/project/getprojects',auth, getAllProjects);
router.get('/project/getproject/:id', getProjectById);
router.put('/project/updateproject/:id', updateProject);
router.put('/project/deleteproject/:id', deleteProject);

// TASK ROUTES
router.post('/project/:id/createtask', createTask);
router.put('/task/deletetask/:id', deleteTask);


// COMMENT ROUTES
router.post('/task/:id/createComment', createComment);
router.delete('/comment/deleteComment/:id', deleteComment);


module.exports = router;
