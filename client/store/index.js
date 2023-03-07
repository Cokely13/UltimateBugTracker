import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import bugsReducer from './allBugsStore'
import auth from './auth'
import singleBugReducer from './singleBugStore'
import usersReducer from './allUsersStore'
import singleUserReducer from './singleUserStore'
import projectsReducer from './allProjectsStore'
import singleProjectReducer from './singleProjectStore'

const reducer = combineReducers({ auth,
allBugs: bugsReducer,
singleBug: singleBugReducer,
allUsers: usersReducer,
singleUser: singleUserReducer,
singleProject: singleProjectReducer,
allProjects: projectsReducer  })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
