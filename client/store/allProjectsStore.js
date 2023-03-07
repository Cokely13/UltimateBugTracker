import Axios from "axios";

const SET_PROJECTS ="SET_PROJECTS"
const CREATE_PROJECT = "CREATE_PROJECT"
const DELETE_PROJECT = "DELETE_PROJECT"


export const setProjects = (projects) =>{
  return{
    type: SET_PROJECTS,
    projects
  }
};

const _createProject = (project) => {
  return {
    type: CREATE_PROJECT,
    project,
  };
};

const _deleteProject = (project) => {
  return {
    type: DELETE_PROJECT,
    project
  };
};

export const fetchProjects = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/projects");
        dispatch(setProjects(data));
  };
};

export const createProject = (project, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/projects", project);
    dispatch(_createProject(created));
  };
};

export const deleteProject = (id, history) => {
  return async (dispatch) => {
    const { data: project } = await Axios.delete(`/api/projects/${id}`);
    dispatch(_deleteProject(project));
  };
};


const initialState = [];
export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects;
      case CREATE_PROJECT:
        return [...state, action.project];
        case DELETE_PROJECT:
      return state.filter((project) => project.id !== action.project.id)
      ;
      default:
        return state;
    }
  }
