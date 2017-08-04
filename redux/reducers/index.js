import {combineReducers} from 'redux'
import userReducer from './userReducer'
import authedReducer from './authedReducer'
import uiReducer from './uiReducer'
import categoryReducer from './categoryReducer'
import {routerReducer} from 'react-router-redux'

const rootReducer = combineReducers({
    users: userReducer,
    authed: authedReducer,
    router: routerReducer,
    ui: uiReducer,
    categories: categoryReducer,
})

//authed: authedReducer,

export default rootReducer
