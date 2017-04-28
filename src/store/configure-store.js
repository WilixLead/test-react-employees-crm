import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers';
import thunk from "redux-thunk";

export default function configureStore(initialState) {

  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk));
  return store;

  /* const store = createStore(rootReducer, initialState)

   if (module.hot) {
   module.hot.accept('../reducers', () => {
   const nextRootReducer = require('../reducers')
   store.replaceReducer(nextRootReducer)
   })
   return store;
   }*/

}