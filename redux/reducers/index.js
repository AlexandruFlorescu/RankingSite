import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import userReducer from './userReducer'
import authedReducer from './authedReducer'
import uiReducer from './uiReducer'
import categoryReducer from './categoryReducer'
import modalReducer from './modalReducer'

const rootReducer = combineReducers({
    users: userReducer,
    authed: authedReducer,
    router: routerReducer,
    ui: uiReducer,
    categories: categoryReducer,
    modal: modalReducer,
})

//authed: authedReducer,

export default rootReducer
