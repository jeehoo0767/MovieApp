import {
    CHANGE_VALUE
} from '../_actions/types';

export default function(state={},action){
    switch(action.type){
        case CHANGE_VALUE:
            return {...state, value: action.payload }

        default:
            return state;
    }
}

// import { createAction, handleActions } from "redux-actions";

// const CHANGE_VALUE = "CHANGE_VALUE";

// export const changeValue = createAction(CHANGE_VALUE, (value) => value);

// const init = {
//   value: "",
// };

// const searchbar = handleActions(
//   {
//     [CHANGE_VALUE]: (state, { payload: value }) => ({
//       ...state,
//       value: value,
//     }),
//   },
//   init
// );

// export default searchbar;