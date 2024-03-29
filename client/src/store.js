import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const initialState = {};

const middleware = [thunk];
let store;


  if (process.env.NODE_ENV === 'production') {
    store = createStore(
      rootReducer, 
      initialState, 
      compose(
        applyMiddleware(...middleware)
      )
      );
  } else {
    store = createStore(
      rootReducer, 
      initialState, 
      compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
      );
  }

export default store;