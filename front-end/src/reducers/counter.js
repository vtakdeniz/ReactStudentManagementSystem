const counterReducer = (state={student_count:0,lecture_count:0,teacher_count:0},action)=>{
    switch(action.type){
        case 'INCREMENTST':
            return {
                ...state,
                student_count: state.student_count + 1,
              };
        case 'DECREMENTST':
            return {
                ...state,
                student_count: state.student_count - 1,
              };
        case 'ZEROST':
        return {
            ...state,
            student_count: 0,
            };
        case 'INCREMENTLT':
            return {
                ...state,
                lecture_count: state.lecture_count + 1,
            };
        case 'DECREMENTLT':
            return {
                ...state,
                lecture_count: state.lecture_count - 1,
            };
        case 'ZEROLT':
            return {
                ...state,
                lecture_count: 0,
            };
        case 'INCREMENTTC':
            return {
                ...state,
                teacher_count: state.teacher_count + 1,
              };
        case 'DECREMENTTC':
            return {
                ...state,
                teacher_count: state.teacher_count - 1,
              };
        case 'ZEROTC':
        return {
            ...state,
            teacher_count: 0,
            };
        default:
            return state;
    }
}

export default counterReducer;