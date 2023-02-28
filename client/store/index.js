import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import bugsReducer from './allBugsStore'
import auth from './auth'
import singleBugReducer from './singleBugStore'

const reducer = combineReducers({ auth,
allBugs: bugsReducer,
singleBug: singleBugReducer })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
