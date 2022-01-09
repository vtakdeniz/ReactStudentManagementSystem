import counterReducer from "./counter";
import boolean_reducer from "./isLogged";
import { combineReducers } from "redux";

const allReducers=combineReducers({
    counter:counterReducer,//counterReducer alone works too
    boolean_reducer:boolean_reducer
});

export default allReducers;