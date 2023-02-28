import axios from "axios";

// Action Types
const SET_SINGLE_BUG = "SET_SINGLE_BUG";
const UPDATE_SINGLE_BUG = "UPDATE_SINGLE_BUG";
const TOKEN = "token";

// Action creators
export const _setSingleBug= (bugdata) => {
  return {
    type: SET_SINGLE_BUG,
    bugdata,
  };
};

const _updateSingleBug = (bugdata) => {
  return {
    type: UPDATE_SINGLE_BUG,
    bugdata,
  };
};

//Thunks
export const fetchBug = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/bugs/${id}`);
    dispatch(_setSingleBug(data));
  };
};

export const updateSingleBug = (bug, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/bugs/${bug.id}`, bug);
        const { data: bugData } = await axios.get(`/api/bugs/${bug.id}`);
        dispatch(_updateSingleBug(bugData));
        history.push(`/bugs/${bug.id}`)
      }
     catch (error) {
      console.log("BUG", bug)
    }
  };
};

// reducer
const initialState = [];
const singleBugReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_BUG:
      return action.bugdata;
    case UPDATE_SINGLE_BUG:
      return action.bugdata;
    default:
      return state;
  }
};

export default singleBugReducer;
