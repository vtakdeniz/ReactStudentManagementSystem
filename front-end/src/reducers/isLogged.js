const boolean_reducer=(state=false,action)=>{
    switch(action.type){
        case 'TOGGLE':
            return !state;
        default:
            return false;
    }
}

export default boolean_reducer;