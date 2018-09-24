import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { auth } from './reducers/authUsers'
import { events } from './reducers/events'

const rootReducer = combineReducers({
    auth, events
})

export default () => createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)


