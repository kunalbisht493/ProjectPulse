import { createContext, useState } from "react";
export const AppContext = createContext();

export function AppContextProvider({ children }) {
    // FOR USER LOGIN
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    // FOR LOGIN/REGISTER UI
    const [isSignUp, setIsSignUp] = useState(false);

    // FOR PROJECT CREATION
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        ProjectManager: '',
        deadline: ''
    });

    // FOR PROJECT DETAILS
    const [projectDetails, setProjectDetails] = useState([])

    // TRASH
    const [trashProject, setTrashProject] = useState([])

    // FOR CREATING PROJECT
    const [showModal, setShowModal] = useState(false);

    const [currentProject, setCurrentProject] = useState(null);
    const [createTasks, setCreateTasks] = useState({
        description:'',
        dueDate:'',
        assignedTo:'',
        priority:''

    });
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [taskColumn, setTaskColumn] = useState('');


    const values = {
        userData,
        setUserData,
        isSignUp,
        setIsSignUp,
        projectData,
        setProjectData,
        projectDetails,
        setProjectDetails,
        showModal,
        setShowModal,
        trashProject,
        setTrashProject,
        currentProject,
        setCurrentProject,
        showCreateTask,
        setShowCreateTask,
        taskColumn,
        setTaskColumn,
        createTasks,
        setCreateTasks
    }

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}
