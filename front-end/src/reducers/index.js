import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import { combineReducers } from "redux";

const allReducers=combineReducers({
    counter:counterReducer,//counterReducer alone works too
    isLogged:loggedReducer
});

export default allReducers;