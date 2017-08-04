import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './reducers/'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

let finalCreateStore = compose(
  applyMiddleware(createLogger(), thunk)
)(createStore)

export default function configureStore( iState={users:[], authed:{}, posts:[], ui:{color:'green'}, categories:[] }) {
  return finalCreateStore(rootReducer, iState);
}
