import Axios from "axios";

const SET_BUGS ="SET_BUGS"
const CREATE_BUG = "CREATE_BUG"
const DELETE_BUG = "DELETE_BUG"


export const setBugs = (bugs) =>{
  return{
    type: SET_BUGS,
    bugs
  }
};

const _createBug = (bug) => {
  return {
    type: CREATE_BUG,
    bug,
  };
};

const _deleteBug = (bug) => {
  return {
    type: DELETE_BUG,
    bug
  };
};

export const fetchBugs = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/bugs");
        dispatch(setBugs(data));
  };
};

export const createBug = (bug, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/bugs", bug);
    dispatch(_createBug(created));
    history.push("/bugs");
  };
};

export const deleteBug = (id, history) => {
  return async (dispatch) => {
    const { data: bug } = await Axios.delete(`/api/bugs/${id}`);
    dispatch(_deleteBug(bug));
    history.push("/bugs");
  };
};


const initialState = [];
export default function bugsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BUGS:
      return action.bugs;
      case CREATE_BUG:
        return [...state, action.bug];
        case DELETE_BUG:
      return state.filter((bug) => bug.id !== action.bug.id)
      ;
      default:
        return state;
    }
  }
