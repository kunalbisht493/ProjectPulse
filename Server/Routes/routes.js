const express = require('express');
const router = express.Router();

const {signup,login} = require('../Controllers/AuthController');
const {createProject, getProjects, getProjectById, updateProject, deleteProject, softDeleteProject, getTrashedProjects, restoreProject} = require('../Controllers/ProjectController');
const {createTask, deleteTask , getTasksByProject} = require('../Controllers/TaskController');
const {createComment, deleteComment} = require('../Controllers/CommentController'); 
const {auth} = require('../Middlewares/Auth');

// SIGNUP AND LOGIN ROUTES
router.post('/signup', signup);
router.post('/login', login);

// PROJECT ROUTE
router.post('/project/createproject', createProject);
router.get('/project/getprojects',auth, getProjects);
router.get('/project/getproject/:id', getProjectById);
router.put('/project/:id/softdelete',softDeleteProject);
router.get('/project/getTrashedProject',auth,getTrashedProjects)
router.put('/project/:id/restoreProject',auth,restoreProject)
router.put('/project/updateproject/:id', updateProject);
router.put('/project/trash/deleteproject/:id', deleteProject);

// TASK ROUTES
router.post('/project/:id/createtask', createTask);
router.get('/project/task/:id',auth,getTasksByProject)
router.put('/task/deletetask/:id', deleteTask);


// COMMENT ROUTES
router.post('/task/:id/createComment', createComment);
router.delete('/comment/deleteComment/:projectId', deleteComment);


module.exports = router;
