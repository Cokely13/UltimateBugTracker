import axios from "axios";

// Action Types
const SET_SINGLE_PROJECT = "SET_SINGLE_PROJECT";
const UPDATE_SINGLE_PROJECT = "UPDATE_SINGLE_PROJECT";
const TOKEN = "token";

// Action creators
export const _setSingleProject= (projectdata) => {
  return {
    type: SET_SINGLE_PROJECT,
    projectdata,
  };
};

const _updateSingleProject = (projectdata) => {
  return {
    type: UPDATE_SINGLE_PROJECT,
    projectdata,
  };
};

//Thunks
export const fetchProject = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/projects/${id}`);
    dispatch(_setSingleProject(data));
  };
};

export const updateSingleProject = (project, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/projects/${project.id}`, project);
        const { data: projectData } = await axios.get(`/api/projects/${project.id}`);
        dispatch(_updateSingleProject(projectData));
        // history.push(`/projects/${project.id}`)
      }
     catch (error) {
      console.log("PROJECT", project)
    }
  };
};

// reducer
const initialState = [];
const singleProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PROJECT:
      return action.projectdata;
    case UPDATE_SINGLE_PROJECT:
      return action.projectdata;
    default:
      return state;
  }
};

export default singleProjectReducer;
