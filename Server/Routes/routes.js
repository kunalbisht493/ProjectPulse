const express = require('express');
const router = express.Router();

const {signup,login} = require('../Controllers/AuthController');
const {createProject, getAllProjects, getProjectById, updateProject, deleteProject} = require('../Controllers/ProjectController');
const {createTask, deleteTask} = require('../Controllers/TaskController');
const {createComment, deleteComment} = require('../Controllers/CommentController'); 

// SIGNUP AND LOGIN ROUTES
router.post('/signup', signup);
router.post('/login', login);

// PROJECT ROUTES
router.post('/createproject', createProject);
router.get('/getallprojects', getAllProjects);
router.get('/getproject/:id', getProjectById);
router.put('/updateproject/:id', updateProject);
router.put('/deleteproject/:id', deleteProject);

// TASK ROUTES
router.post('/createTask', createTask);
router.put('/deleteTask/:id', deleteTask);


// COMMENT ROUTES
router.post('/createComment', createComment);
router.delete('/deleteComment/:id', deleteComment);


module.exports = router;
